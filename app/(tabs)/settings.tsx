import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/use-theme";

export default function SettingsScreen() {
  const { theme, isDark, themeMode, setThemeMode, toggleTheme } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text.primary, fontFamily: "Poppins-Bold" }]}>
          Ajustes
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text.secondary, fontFamily: "Poppins-SemiBold" }]}>
          Apariencia
        </Text>

        <View style={[styles.card, { backgroundColor: theme.background.secondary, borderColor: theme.border.default }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name={isDark ? "moon" : "sunny"} size={24} color={theme.accent.blue} />
              <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>
                Modo Oscuro
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border.subtle, true: theme.accent.blue }}
              thumbColor={isDark ? theme.accent.green : "#f4f3f4"}
            />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border.default }]} />

          <TouchableOpacity 
            style={styles.settingRow}
            onPress={() => setThemeMode("system")}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="phone-portrait" size={24} color={theme.accent.blue} />
              <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>
                Sistema
              </Text>
            </View>
            {themeMode === "system" && (
              <Ionicons name="checkmark" size={20} color={theme.accent.green} />
            )}
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border.default }]} />

          <TouchableOpacity 
            style={styles.settingRow}
            onPress={() => setThemeMode("light")}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="sunny" size={24} color={theme.accent.blue} />
              <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>
                Claro
              </Text>
            </View>
            {themeMode === "light" && (
              <Ionicons name="checkmark" size={20} color={theme.accent.green} />
            )}
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border.default }]} />

          <TouchableOpacity 
            style={styles.settingRow}
            onPress={() => setThemeMode("dark")}
          >
            <View style={styles.settingInfo}>
              <Ionicons name="moon" size={24} color={theme.accent.blue} />
              <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>
                Oscuro
              </Text>
            </View>
            {themeMode === "dark" && (
              <Ionicons name="checkmark" size={20} color={theme.accent.green} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text.secondary, fontFamily: "Poppins-SemiBold" }]}>
          Información
        </Text>

        <View style={[styles.card, { backgroundColor: theme.background.secondary, borderColor: theme.border.default }]}>
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>
              Versión
            </Text>
            <Text style={[styles.settingValue, { color: theme.text.secondary, fontFamily: "Poppins" }]}>
              1.0.0
            </Text>
          </View>

          <View style={[styles.divider, { backgroundColor: theme.border.default }]} />

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>
              Sistema de Catastro
            </Text>
            <Text style={[styles.settingValue, { color: theme.text.secondary, fontFamily: "Poppins" }]}>
              Cochabamba
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    marginBottom: 8,
    marginLeft: 4,
    textTransform: "uppercase",
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingLabel: {
    fontSize: 16,
    marginLeft: 12,
  },
  settingValue: {
    fontSize: 14,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
});
