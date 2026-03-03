import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import { MAP_CONFIG } from "../constants/config";

interface LeafletMapProps {
  latitude: number;
  longitude: number;
  zoom: number;
  visibleLayers?: string[];
}

const LeafletMap: React.FC<LeafletMapProps> = ({
  latitude,
  longitude,
  zoom,
  visibleLayers = [],
}) => {
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (visibleLayers.length > 0 && webViewRef.current) {
      const script = `
        window.updateLayers(${JSON.stringify(visibleLayers)});
        true;
      `;
      webViewRef.current.injectJavaScript(script);
    }
  }, [visibleLayers]);

  const leafletHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          html, body, #map { padding: 0; margin: 0; height: 100%; width: 100%; }
          .leaflet-control-layers { max-height: 200px; overflow-y: auto; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
          }).addTo(map);

          const layers = {};

          const configLayers = [
            { id: 'LIMITES', url: "${MAP_CONFIG.SERVICES.LIMITES}", name: "Límites Municipales" },
            { id: 'USO_SUELO', url: "${MAP_CONFIG.SERVICES.USO_SUELO}", name: "Uso de Suelo" },
            { id: 'MANZANAS', url: "${MAP_CONFIG.SERVICES.MANZANAS}", name: "Manzana" },
            { id: 'VIAS', url: "${MAP_CONFIG.SERVICES.VIAS}", name: "Vías y Ejes" },
            { id: 'PREDIOS', url: "${MAP_CONFIG.SERVICES.PREDIOS}", name: "Predios Catastrales" }
          ];

          configLayers.forEach(l => {
            if (l.url) {
              layers[l.id] = L.tileLayer(l.url + '/tile/{z}/{y}/{x}', {
                layers: l.id,
                transparent: true,
                format: 'image/png',
                opacity: 0.7
              });
              map.addLayer(layers[l.id]);
              layers[l.id].bringToBack();
            }
          });

          window.updateLayers = (visibleIds) => {
            Object.keys(layers).forEach(id => {
              if (layers[id]) {
                if (visibleIds.includes(id)) {
                  if (!map.hasLayer(layers[id])) {
                    map.addLayer(layers[id]);
                  }
                } else {
                  if (map.hasLayer(layers[id])) {
                    map.removeLayer(layers[id]);
                  }
                }
              }
            });
          };

          window.addEventListener('message', function(e) {
            try {
              const data = JSON.parse(e.data);
              if (data.type === 'updateLayers' && data.layers) {
                window.updateLayers(data.layers);
              }
            } catch(err) {}
          });

          window.updateLayers(${JSON.stringify(visibleLayers.length > 0 ? visibleLayers : ['LIMITES'])});
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={["*"]}
        source={{ html: leafletHTML }}
        style={{ flex: 1 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
        mixedContentMode="always"
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
      />
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={StyleSheet.absoluteFill}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default LeafletMap;
