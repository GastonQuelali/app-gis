import React from "react";
import { StyleSheet, View } from "react-native";
import ArcGISMap from "../../components/ArcGISMap";
import { MAP_CONFIG } from "../../constants/arcgis";

export default function ArcGISScreen() {
  return (
    <View style={styles.container}>
      <ArcGISMap
        latitude={MAP_CONFIG.INITIAL_REGION.latitude}
        longitude={MAP_CONFIG.INITIAL_REGION.longitude}
        zoom={MAP_CONFIG.INITIAL_REGION.zoom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
