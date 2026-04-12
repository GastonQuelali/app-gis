import React, { useMemo } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import { ARCGIS_CONFIG, getBaseMapUrl, getLayerUrl } from "../constants/arcgis";
import { generateArcGISHTML } from "../constants/templates/arcgis-map";

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

  const arcgisHTML = useMemo(() => {
    return generateArcGISHTML({
      latitude,
      longitude,
      zoom,
      capas: capasConfig,
      baseMaps: baseMapsConfig,
      visibleLayers
    });
  }, [latitude, longitude, zoom, visibleLayers]);

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
