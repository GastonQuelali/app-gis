import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export function CustomDrawerContent(props: any) {
  const { theme } = useTheme();
  const router = useRouter();
  
  const menuItems = [
    { name: "index", label: "Inicio", icon: "home-outline", route: "/(tabs)" },
    { name: "arcgis", label: "Mapa Base", icon: "map-outline", route: "/(tabs)/arcgis" },
    { name: "settings", label: "Ajustes", icon: "settings-outline", route: "/(tabs)/settings" },
  ];

  return (
    <View style={[styles.drawerContent, { backgroundColor: theme.background.secondary }]}>
      <View style={[styles.header, { paddingTop: 50 }]}>
        <Text style={[styles.appTitle, { color: theme.text.primary }]}>App GIS</Text>
      </View>
      <View style={styles.menuItems}>
        {menuItems.map((item) => (
          <Pressable
            key={item.name}
            style={[styles.menuItem, { backgroundColor: theme.background.tertiary }]}
            onPress={() => {
              props.navigation.closeDrawer();
              router.replace(item.route);
            }}
          >
            <Ionicons
              name={item.icon as any}
              size={22}
              color={theme.text.secondary}
            />
            <Text style={[styles.menuLabel, { color: theme.text.secondary }]}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
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