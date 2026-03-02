import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { MAP_CONFIG } from "../constants/config"; // Importamos para tener las URLs

interface ArcGISMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

const ArcGISMap: React.FC<ArcGISMapProps> = ({ latitude, longitude, zoom }) => {
  const arcgisHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        <link rel="stylesheet" href="https://js.arcgis.com/4.28/esri/themes/light/main.css" />
        <script src="https://js.arcgis.com/4.28/"></script>
        <style>
          html, body, #viewDiv { padding: 0; margin: 0; height: 100%; width: 100%; background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <div id="viewDiv"></div>
        <script>
          require([
            "esri/Map", 
            "esri/views/MapView", 
            "esri/layers/MapImageLayer",
            "esri/layers/TileLayer"
          ], (Map, MapView, MapImageLayer, TileLayer) => {
            
            // 1. Crear el mapa base (híbrido para tener satélite + etiquetas)
            const map = new Map({ basemap: "hybrid" });

            // 2. Cargar Imagen Satelital propia (2022) como fondo si es Tiled
            const img22 = new TileLayer({ 
              url: "${MAP_CONFIG.SERVICES.IMAGEN_2022}",
              opacity: 1
            });
            map.add(img22);

            // 3. Cargar capas dinámicas de Catastro
            const capasDinamicas = [
              { url: "${MAP_CONFIG.SERVICES.LIMITES}", title: "Límites" },
              { url: "${MAP_CONFIG.SERVICES.USO_SUELO}", title: "Uso de Suelo", opacity: 0.5 },
              { url: "${MAP_CONFIG.SERVICES.MANZANAS}", title: "Manzanas" },
              { url: "${MAP_CONFIG.SERVICES.VIAS}", title: "Vías" },
              { url: "${MAP_CONFIG.SERVICES.PREDIOS}", title: "Predios" }
            ];

            capasDinamicas.forEach(config => {
              if (config.url) {
                const layer = new MapImageLayer({ 
                  url: config.url,
                  opacity: config.opacity || 1
                });
                map.add(layer);
              }
            });

            // 4. Inicializar la vista
            const view = new MapView({
              container: "viewDiv",
              map: map,
              center: [${longitude}, ${latitude}],
              zoom: ${zoom},
              ui: { components: ["attribution", "zoom"] }
            });
          });
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: arcgisHTML }}
        style={{ flex: 1 }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
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
