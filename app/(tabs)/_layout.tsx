import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const { theme, isDark } = useTheme();

  const menuItems = [
    { name: "index", label: "Inicio", icon: "home-outline" },
    { name: "arcgis", label: "Mapa Base", icon: "map-outline" },
    { name: "settings", label: "Ajustes", icon: "settings-outline" },
  ];

  const handleMenuPress = (name: string) => {
    setMenuVisible(false);
    router.replace("/(tabs)/" + name);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.accent.blue,
          tabBarStyle: {
            backgroundColor: theme.background.primary,
            borderTopColor: theme.border.default,
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Inicio",
            tabBarIcon: ({ color }) => (
              <Ionicons name="grid" color={color} size={26} />
            ),
          }}
        />
        <Tabs.Screen
          name="arcgis"
          options={{
            title: "Mapa Base",
            tabBarIcon: ({ color }) => (
              <Ionicons name="map" size={26} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menú",
            tabBarIcon: ({ color }) => (
              <Ionicons name="menu" size={26} color={color} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              setMenuVisible(true);
            },
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Ajustes",
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" size={26} color={color} />
            ),
          }}
        />
      </Tabs>

      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <View
          style={[
            styles.overlay,
            { backgroundColor: isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.3)" },
          ]}
        >
          <Pressable
            style={styles.backdrop}
            onPress={() => setMenuVisible(false)}
          />
          <View
            style={[
              styles.drawer,
              { backgroundColor: theme.background.secondary },
            ]}
          >
            <View style={[styles.header, { paddingTop: isDark ? 50 : 40 }]}>
              <Text style={[styles.appTitle, { color: theme.text.primary }]}>
                App GIS
              </Text>
            </View>
            <View style={styles.menuItems}>
              {menuItems.map((item) => (
                <Pressable
                  key={item.name}
                  style={[
                    styles.menuItem,
                    { backgroundColor: theme.background.tertiary },
                  ]}
                  onPress={() => handleMenuPress(item.name)}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={theme.text.secondary}
                  />
                  <Text
                    style={[styles.menuLabel, { color: theme.text.secondary }]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
  },
  drawer: {
    width: 280,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: "600",
  },
  menuItems: {
    gap: 4,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 16,
  },
  menuLabel: {
    fontSize: 16,
  },
});
