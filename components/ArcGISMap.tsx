import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { ARCGIS_CONFIG, getLayerUrl, getBaseMapUrl } from "../constants/arcgis";

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
  const webViewRef = React.useRef<WebView>(null);

  React.useEffect(() => {
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

  const capasConfig = [
    { title: "Límites Municipales", id: "LIMITES", url: getLayerUrl("LIMITES") },
    { title: "Uso de Suelo", id: "USO_SUELO", url: getLayerUrl("USO_SUELO") },
    { title: "Manzana", id: "MANZANAS", url: getLayerUrl("MANZANAS") },
    { title: "Vías y Ejes", id: "VIAS", url: getLayerUrl("VIAS") },
    { title: "Predios Catastrales", id: "PREDIOS", url: getLayerUrl("PREDIOS") }
  ];

  const baseMapsOrder = [2023, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2004, 2000, 1994, 1964];

  const baseMapsConfig = baseMapsOrder.map(year => ({
    year,
    url: getBaseMapUrl(year as keyof typeof ARCGIS_CONFIG.BASE_MAPS)
  }));

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
          .esri-basemap-gallery { max-height: 500px !important; }
          .esri-basemap-gallery__item { height: 80px !important; margin-bottom: 5px !important; }
          .esri-basemap-gallery__item-thumbnail { height: 60px !important; width: auto !important; }
        </style>
      </head>
      <body>
        <div id="viewDiv"></div>
        <script>
          require([
            "esri/Map", 
            "esri/views/MapView", 
            "esri/layers/MapImageLayer",
            "esri/layers/TileLayer",
            "esri/Basemap",
            "esri/widgets/LayerList",
            "esri/widgets/BasemapGallery",
            "esri/widgets/Expand",
            "esri/widgets/Search",
            "esri/widgets/Home"
          ], (Map, MapView, MapImageLayer, TileLayer, Basemap, LayerList, BasemapGallery, Expand, Search, Home) => {

            const map = new Map();
            const layers = {};

            const capas = ${JSON.stringify(capasConfig)};

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

            // Crear basemaps para galería
            function crearBasemap(url, titulo, id) {
              const tileLayer = new TileLayer({
                url: url,
                title: titulo,
                copyright: "GRS 80 - MARGEN SIRGAS(WGS 84)"
              });
              return new Basemap({
                baseLayers: [tileLayer],
                title: titulo,
                id: id,
                thumbnailUrl: url + "/info/thumbnail"
              });
            }

            // Galería de mapas base (imágenes históricas)
            const baseMaps = ${JSON.stringify(baseMapsConfig.map(bm => ({
              url: bm.url,
              title: bm.year.toString(),
              id: `baseMap${bm.year}`
            })))}.map(bm => crearBasemap(bm.url, bm.title, bm.id));

            const basemapGallery = new BasemapGallery({
              view: view,
              source: baseMaps
            });

            const basemapGalleryExpand = new Expand({
              view: view,
              content: basemapGallery,
              expandIcon: "basemap",
              group: "bottom-right"
            });
            
            view.ui.add(basemapGalleryExpand, "bottom-right");

            // Widget de búsqueda
            const searchWidget = new Search({ view: view });
            const searchExpand = new Expand({
              view: view,
              content: searchWidget,
              expanded: false,
              group: "top-right"
            });
            view.ui.add(searchExpand, "top-right");

            // Widget de capas
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

            // Botón home
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
