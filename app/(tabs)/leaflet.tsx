import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ScrollView } from "react-native";
import LeafletMap from "../../components/LeafletMap";
import { MAP_CONFIG } from "../../constants/config";

const AVAILABLE_LAYERS = [
  { id: 'LIMITES', name: 'Límites Municipales' },
  { id: 'USO_SUELO', name: 'Uso de Suelo' },
  { id: 'MANZANAS', name: 'Manzana' },
  { id: 'VIAS', name: 'Vías y Ejes' },
  { id: 'PREDIOS', name: 'Predios Catastrales' },
];

export default function LeafletScreen() {
  const [visibleLayers, setVisibleLayers] = useState<string[]>(['LIMITES']);

  const toggleLayer = (layerId: string) => {
    setVisibleLayers(prev => 
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <LeafletMap
          latitude={MAP_CONFIG.INITIAL_REGION.latitude}
          longitude={MAP_CONFIG.INITIAL_REGION.longitude}
          zoom={MAP_CONFIG.INITIAL_REGION.zoom}
          visibleLayers={visibleLayers}
        />
      </View>
      <View style={styles.layerControl}>
        <Text style={styles.layerTitle}>Capas</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {AVAILABLE_LAYERS.map(layer => (
            <TouchableOpacity
              key={layer.id}
              style={[
                styles.layerButton,
                visibleLayers.includes(layer.id) && styles.layerButtonActive
              ]}
              onPress={() => toggleLayer(layer.id)}
            >
              <Text style={[
                styles.layerButtonText,
                visibleLayers.includes(layer.id) && styles.layerButtonTextActive
              ]}>
                {layer.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: { flex: 1 },
  layerControl: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  layerTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  layerButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  layerButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  layerButtonText: {
    fontSize: 13,
    color: '#333',
  },
  layerButtonTextActive: {
    color: '#fff',
  },
});
