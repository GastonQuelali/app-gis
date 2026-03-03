import React, { useEffect, useRef } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { MAP_CONFIG } from "../constants/config";

interface ArcGISMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  visibleLayers?: string[];
}

const ArcGISMap: React.FC<ArcGISMapProps> = ({
  latitude,
  longitude,
  zoom,
  visibleLayers = [],
}) => {
  const webViewRef = useRef<WebView>(null);

  useEffect(() => {
    if (webViewRef.current && visibleLayers.length > 0) {
      const script = `
        if (window.updateLayers) {
          window.updateLayers(${JSON.stringify(visibleLayers)});
        }
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [visibleLayers]);

  const arcgisHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css" />
        <script src="https://js.arcgis.com/4.28/"></script>
        <style>
          html, body, #viewDiv { padding: 0; margin: 0; height: 100%; width: 100%; }
          .esri-ui-corner .esri-component { margin-bottom: 10px; }
        </style>
      </head>
      <body>
        <div id="viewDiv"></div>
        <script>
          require([
            "esri/Map", 
            "esri/views/MapView", 
            "esri/layers/MapImageLayer",
            "esri/widgets/LayerList",
            "esri/widgets/Expand",
            "esri/widgets/Search",
            "esri/widgets/Home"
          ], (Map, MapView, MapImageLayer, LayerList, Expand, Search, Home) => {

            const map = new Map({ basemap: "hybrid" });
            const layers = {};

            const capas = [
              { title: "Límites Municipales", id: "LIMITES", url: "${MAP_CONFIG.SERVICES.LIMITES}" },
              { title: "Uso de Suelo", id: "USO_SUELO", url: "${MAP_CONFIG.SERVICES.USO_SUELO}" },
              { title: "Manzana", id: "MANZANAS", url: "${MAP_CONFIG.SERVICES.MANZANAS}" },
              { title: "Vías y Ejes", id: "VIAS", url: "${MAP_CONFIG.SERVICES.VIAS}" },
              { title: "Predios Catastrales", id: "PREDIOS", url: "${MAP_CONFIG.SERVICES.PREDIOS}" }
            ];

            capas.forEach(c => {
              if(c.url) {
                const ly = new MapImageLayer({ 
                  url: c.url, 
                  title: c.title,
                  id: c.id,
                  visible: c.id === "LIMITES"
                });
                layers[c.id] = ly;
                map.add(ly);
              }
            });

            const view = new MapView({
              container: "viewDiv",
              map: map,
              center: [${longitude}, ${latitude}],
              zoom: ${zoom}
            });

            view.when(() => {
              window.updateLayers = (visibleIds) => {
                Object.keys(layers).forEach(id => {
                  if (layers[id]) {
                    layers[id].visible = visibleIds.includes(id);
                  }
                });
              };

              window.updateLayers(${JSON.stringify(visibleLayers.length > 0 ? visibleLayers : ['LIMITES'])});
            });

            const searchWidget = new Search({ view: view });
            const searchExpand = new Expand({
              view: view,
              content: searchWidget,
              expanded: false,
              group: "top-right"
            });
            view.ui.add(searchExpand, "top-right");

            const layerList = new LayerList({ 
              view: view,
              selectionEnabled: true,
              container: document.createElement("div")
            });
            
            const layerExpand = new Expand({
              view: view,
              content: layerList,
              expandIcon: "layers",
              group: "top-right"
            });
            view.ui.add(layerExpand, "top-right");

            const homeBtn = new Home({ view: view });
            view.ui.add(homeBtn, "top-left");

          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: arcgisHTML }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        mixedContentMode="always"
        startInLoadingState={true}
        renderLoading={() => (
          <ActivityIndicator
            size="large"
            color="#007AFF"
            style={StyleSheet.absoluteFill}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1 } });
export default ArcGISMap;
