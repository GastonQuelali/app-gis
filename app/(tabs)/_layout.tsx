import { useTheme } from "@/hooks/use-theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { CustomDrawerContent } from "@/components/drawer/DrawerContent";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Drawer = createDrawerNavigator();

let globalNavigation: any;
let setCurrentTabName: ((name: string) => void) | null = null;

function CustomHeader({ title }: { title: string }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.background.primary, borderBottomColor: theme.border.default }]}>
      <Pressable 
        style={styles.menuButton}
        onPress={() => globalNavigation?.openDrawer?.()}
      >
        <Ionicons name="menu" size={24} color={theme.text.primary} />
      </Pressable>
      <Text style={[styles.title, { color: theme.text.primary }]}>{title}</Text>
      <View style={{ width: 24 }} />
    </View>
  );
}

function DrawerMenu() {
  const { theme } = useTheme();
  const [currentTitle, setCurrentTitle] = useState("Inicio");

  useEffect(() => {
    setCurrentTabName = setCurrentTitle;
  }, []);

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        globalNavigation = props.navigation;
        return <CustomDrawerContent {...props} />;
      }}
      screenOptions={{
        headerShown: false,
        drawerType: "front",
        drawerStyle: {
          backgroundColor: theme.background.secondary,
          width: 280,
        },
        swipeEnabled: true,
        swipeEdgeWidth: 30,
      }}
    >
      <Drawer.Screen name="HomeTabs">
        {() => (
          <View style={{ flex: 1 }}>
            <CustomHeader title={currentTitle} />
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
                listeners={{
                  focus: () => setCurrentTabName?.("Inicio"),
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
                listeners={{
                  focus: () => setCurrentTabName?.("Mapa Base"),
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
                  focus: () => setCurrentTabName?.("Menú"),
                  tabPress: (e) => {
                    e.preventDefault();
                    globalNavigation?.openDrawer?.();
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
                listeners={{
                  focus: () => setCurrentTabName?.("Ajustes"),
                }}
              />
            </Tabs>
          </View>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DrawerMenu;