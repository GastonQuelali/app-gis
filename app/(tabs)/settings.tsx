import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Switch, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useTheme } from "@/hooks/use-theme";

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar Sesión", style: "destructive", onPress: () => router.replace("/") }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <View style={styles.section}>
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.background.secondary, borderColor: theme.border.default }]}>
          <View style={styles.profileRow}>
            <View style={[styles.avatar, { backgroundColor: theme.accent.blue }]}>
              <Text style={styles.avatarText}>G</Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.text.primary, fontFamily: "Poppins-SemiBold" }]}>
                Gastón Quelali
              </Text>
              <Text style={[styles.profileEmail, { color: theme.text.secondary, fontFamily: "Poppins" }]}>
                gaston.quelali@gmail.com
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.text.muted} />
          </View>
        </TouchableOpacity>
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
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text.secondary, fontFamily: "Poppins-SemiBold" }]}>Legal</Text>
        <View style={[styles.card, { backgroundColor: theme.background.secondary, borderColor: theme.border.default }]}>
          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="chatbubble-outline" size={24} color={theme.accent.blue} />
              <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>Contáctanos</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.text.muted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border.default }]} />

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="shield-outline" size={24} color={theme.accent.blue} />
              <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>Privacy Policy</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.text.muted} />
          </TouchableOpacity>

          <View style={[styles.divider, { backgroundColor: theme.border.default }]} />

          <TouchableOpacity style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="document-text-outline" size={24} color={theme.accent.blue} />
              <Text style={[styles.settingLabel, { color: theme.text.primary, fontFamily: "Poppins" }]}>Terms & Policies</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.text.muted} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={[styles.card, { backgroundColor: theme.background.secondary, borderColor: theme.border.default }]} onPress={handleLogout}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Ionicons name="log-out-outline" size={24} color="#EF4444" />
              <Text style={[styles.settingLabel, { color: "#EF4444", fontFamily: "Poppins" }]}>Cerrar Sesión</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.text.muted, fontFamily: "Poppins" }]}>Versión 1.0.0</Text>
        <Text style={[styles.footerText, { color: theme.text.muted, fontFamily: "Poppins" }]}>Sistema de Catastro - Cochabamba</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { paddingHorizontal: 16, marginBottom: 24, paddingTop: 20 },
  sectionTitle: { fontSize: 14, marginBottom: 8, marginLeft: 4, textTransform: "uppercase" },
  card: { borderRadius: 12, borderWidth: 1, overflow: "hidden" },
  profileRow: { flexDirection: "row", alignItems: "center", padding: 16 },
  avatar: { width: 50, height: 50, borderRadius: 25, justifyContent: "center", alignItems: "center" },
  avatarText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  profileInfo: { flex: 1, marginLeft: 12 },
  profileName: { fontSize: 16, fontWeight: "600" },
  profileEmail: { fontSize: 14, marginTop: 2 },
  settingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", padding: 16 },
  settingInfo: { flexDirection: "row", alignItems: "center" },
  settingLabel: { fontSize: 16, marginLeft: 12 },
  divider: { height: 1, marginHorizontal: 16 },
  footer: { alignItems: "center", paddingVertical: 24 },
  footerText: { fontSize: 12, marginBottom: 4 },
});
