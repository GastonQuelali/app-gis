import { useTheme } from "@/hooks/use-theme";
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
  getManzanaUrl,
  getPrediosCountUrl,
} from "../../constants/arcgis";

export default function DashboardScreen() {
  const { theme } = useTheme();
  const [prediosCount, setPrediosCount] = useState<number | null>(null);
  const [manzanaCount, setManzanaCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
    Promise.all([
      axios.get(getPrediosCountUrl()),
      axios.get(getManzanaUrl()),
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
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background.primary }]}
    >
      <View style={[styles.header, { backgroundColor: theme.accent.blue }]}>
        <Text style={[styles.title, { fontFamily: "Poppins-Bold" }]}>
          Sistema de Catastro
        </Text>
        <Text style={[styles.subtitle, { fontFamily: "Poppins" }]}>
          Cochabamba - Bolivia
        </Text>
      </View>

      <View style={styles.cardContainer}>
        <View style={[styles.card, { backgroundColor: theme.accent.green }]}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={[styles.cardValue, { fontFamily: "Poppins-Bold" }]}>
                {prediosCount !== null ? formatNumber(prediosCount) : "—"}
              </Text>
              <Text style={[styles.cardLabel, { fontFamily: "Poppins" }]}>
                Total Predios
              </Text>
            </>
          )}
        </View>
        <View style={[styles.card, { backgroundColor: theme.accent.blue }]}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={[styles.cardValue, { fontFamily: "Poppins-Bold" }]}>
                {manzanaCount !== null ? formatNumber(manzanaCount) : "—"}
              </Text>
              <Text style={[styles.cardLabel, { fontFamily: "Poppins" }]}>
                Total Manzana
              </Text>
            </>
          )}
        </View>
      </View>

      <View
        style={[
          styles.infoBox,
          {
            backgroundColor: theme.background.secondary,
            borderColor: theme.border.default,
          },
        ]}
      >
        <Text
          style={[
            styles.infoTitle,
            { color: theme.text.primary, fontFamily: "Poppins-SemiBold" },
          ]}
        >
          Mapa Interactivo
        </Text>
        <Text
          style={[
            styles.infoText,
            { color: theme.text.secondary, fontFamily: "Poppins" },
          ]}
        >
          Explora el mapa de Cochabamba con imágenes satelitales históricas
          desde 1964 hasta 2023.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 30, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  subtitle: { fontSize: 16, opacity: 0.9 },
  cardContainer: {
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-between",
  },
  card: {
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
    borderRadius: 10,
    borderWidth: 1,
  },
  infoTitle: { fontWeight: "bold", marginBottom: 10 },
  infoText: { lineHeight: 20 },
});
