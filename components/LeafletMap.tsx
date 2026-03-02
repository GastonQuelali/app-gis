import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { MAP_CONFIG } from "../constants/config";

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude,
  longitude,
  zoom,
}) => {
  const leafletHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
        
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        
        <script src="https://unpkg.com/esri-leaflet@3.0.12/dist/esri-leaflet.js"></script>
        
        <style>
          body { margin: 0; padding: 0; }
          #map { position: absolute; top: 0; bottom: 0; width: 100%; background: #f0f0f0; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          // Inicializar mapa
          const map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});

          // 1. Imagen Satelital 2022 (Es un Tiled Map Service)
          L.esri.tiledMapLayer({
            url: "${MAP_CONFIG.SERVICES.IMAGEN_2022}",
            maxZoom: 19
          }).addTo(map);

          // 2. Límites (Dynamic)
          L.esri.dynamicMapLayer({
            url: "${MAP_CONFIG.SERVICES.LIMITES}",
            opacity: 1
          }).addTo(map);

          // 3. Uso de Suelo (Dynamic con Opacidad)
          L.esri.dynamicMapLayer({
            url: "${MAP_CONFIG.SERVICES.USO_SUELO}",
            opacity: 0.5
          }).addTo(map);

          // 4. Manzanas (Dynamic)
          L.esri.dynamicMapLayer({
            url: "${MAP_CONFIG.SERVICES.MANZANAS}"
          }).addTo(map);

          // 5. Vías (Dynamic)
          L.esri.dynamicMapLayer({
            url: "${MAP_CONFIG.SERVICES.VIAS}"
          }).addTo(map);

          // 6. Predios (Dynamic - La más pesada al final)
          L.esri.dynamicMapLayer({
            url: "${MAP_CONFIG.SERVICES.PREDIOS}"
          }).addTo(map);

        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: leafletHTML }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
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

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default LeafletMap;
