import React from "react";
import { StyleSheet, View } from "react-native";
import LeafletMap from "../../components/LeafletMap";
import { MAP_CONFIG } from "../../constants/config";

export default function LeafletScreen() {
  return (
    <View style={styles.container}>
      <LeafletMap
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
