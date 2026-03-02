import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function DashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sistema de Catastro</Text>
        <Text style={styles.subtitle}>Cochabamba - Bolivia</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardValue}>1,245</Text>
          <Text style={styles.cardLabel}>Predios Revisados</Text>
        </View>
        <View style={[styles.card, { backgroundColor: "#34C759" }]}>
          <Text style={styles.cardValue}>85%</Text>
          <Text style={styles.cardLabel}>Precisión GIS</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Comparativa de Motores</Text>
        <Text style={styles.infoText}>
          Usa las pestañas inferiores para comparar la carga de capas entre el
          SDK oficial de ArcGIS y la solución libre Leaflet.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  header: { padding: 30, backgroundColor: "#007AFF", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, color: "#e0e0e0" },
  cardContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#5856D6",
    padding: 20,
    borderRadius: 15,
    width: "48%",
    elevation: 3,
  },
  cardValue: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  cardLabel: { fontSize: 12, color: "#fff", opacity: 0.9 },
  infoBox: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  infoTitle: { fontWeight: "bold", marginBottom: 10 },
  infoText: { color: "#666", lineHeight: 20 },
});
