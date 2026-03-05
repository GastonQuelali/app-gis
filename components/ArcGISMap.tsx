import React from "react";
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

            // Galería de mapas base (imágenes históricas) - orden descendente
            const baseMaps = [
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen_2023_500/MapServer', '2023', 'baseMap2023'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2022/MapServer', '2022', 'baseMap2022'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2019_500/MapServer', '2019', 'baseMap2019'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services//imagenes/CBA_2018500/MapServer', '2018', 'baseMap2018'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2017_500/MapServer', '2017', 'baseMap2017'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/CBBA_2016_500/MapServer', '2016', 'baseMap2016'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2015_500/MapServer', '2015', 'baseMap2015'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2014_500/MapServer', '2014', 'baseMap2014'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2013_500/MapServer', '2013', 'baseMap2013'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2012_500/MapServer', '2012', 'baseMap2012'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2011_500/MapServer', '2011', 'baseMap2011'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2010_500/MapServer', '2010', 'baseMap2010'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2009_500/MapServer', '2009', 'baseMap2009'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/CBBA_2008_500/MapServer', '2008', 'baseMap2008'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2007_500/MapServer', '2007', 'baseMap2007'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen_2004500/MapServer', '2004', 'baseMap2004'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen2000_500/MapServer', '2000', 'baseMap2000'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/CBA_1994_500/MapServer', '1994', 'baseMap1994'),
              crearBasemap('http://192.168.105.219:6080/arcgis/rest/services/imagenes/imagen1964_500/MapServer', '1964', 'baseMap1964')
            ];

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
