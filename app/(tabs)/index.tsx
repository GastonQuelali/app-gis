import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  getManzanasCountUrl,
  getPrediosCountUrl,
} from "../../constants/arcgis";

export default function DashboardScreen() {
  const [prediosCount, setPrediosCount] = useState<number | null>(null);
  const [manzanaCount, setManzanaCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get(getPrediosCountUrl()),
      axios.get(getManzanasCountUrl()),
    ])
      .then(([prediosRes, manzanaRes]) => {
        setPrediosCount(prediosRes.data.count || 0);
        setManzanaCount(manzanaRes.data.count || 0);
        setLoading(false);
      })
      .catch(() => {
        setPrediosCount(0);
        setManzanaCount(0);
        setLoading(false);
      });
  }, []);

  const formatNumber = (num: number) => {
    return num.toLocaleString("es-BO");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sistema de Catastro</Text>
        <Text style={styles.subtitle}>Cochabamba - Bolivia</Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.card}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.cardValue}>
                {prediosCount !== null ? formatNumber(prediosCount) : "—"}
              </Text>
              <Text style={styles.cardLabel}>Total Predios</Text>
            </>
          )}
        </View>
        <View style={[styles.card, { backgroundColor: "#5856D6" }]}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.cardValue}>
                {manzanaCount !== null ? formatNumber(manzanaCount) : "—"}
              </Text>
              <Text style={styles.cardLabel}>Total Manzana</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Mapa Interactivo</Text>
        <Text style={styles.infoText}>
          Explora el mapa de Cochabamba con imágenes satelitales históricas
          desde 1964 hasta 2023.
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
    backgroundColor: "#34C759",
    padding: 20,
    borderRadius: 15,
    width: "48%",
    elevation: 3,
    alignItems: "center",
    minHeight: 90,
    justifyContent: "center",
  },
  cardValue: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  cardLabel: { fontSize: 12, color: "#fff", opacity: 0.9, marginTop: 4 },
  infoBox: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  infoTitle: { fontWeight: "bold", marginBottom: 10 },
  infoText: { color: "#666", lineHeight: 20 },
});
