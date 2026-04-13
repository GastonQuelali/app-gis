import { Feather } from '@expo/vector-icons';
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { useTheme } from '@/hooks/use-theme';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface DrawerItemProps {
  label: string;
  iconName: string;
  isActive: boolean;
  onPress: () => void;
}

function DrawerItem({ label, iconName, isActive, onPress }: DrawerItemProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.drawerItem,
        {
          backgroundColor: pressed
            ? theme.background.tertiary
            : isActive
            ? theme.background.tertiary
            : 'transparent',
          borderLeftColor: isActive ? theme.accent.blue : 'transparent',
        },
      ]}
    >
      <Feather
        name={iconName as any}
        size={22}
        color={isActive ? theme.accent.blue : theme.text.secondary}
      />
      <Text
        style={[
          styles.drawerItemLabel,
          {
            color: isActive ? theme.accent.blue : theme.text.secondary,
            fontWeight: isActive ? '600' : '400',
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function DrawerContent(props: DrawerContentComponentProps) {
  const { theme } = useTheme();
  const currentRoute = props.state.routeNames[props.state.index];

  const menuItems = [
    { name: 'Inicio', label: 'Inicio', icon: 'home', route: 'index' },
    { name: 'arcgis', label: 'Mapa Base', icon: 'map', route: 'arcgis' },
    { name: 'settings', label: 'Ajustes', icon: 'settings', route: 'settings' },
    { name: 'password', label: 'Iniciar Sesión', icon: 'log-in', route: 'password' },
  ];

  const handleNavigation = (routeName: string) => {
    props.navigation.navigate(routeName);
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContent}>
      <View style={[styles.drawerHeader, { backgroundColor: theme.background.secondary }]}>
        <View style={[styles.logoContainer, { backgroundColor: theme.accent.blue }]}>
          <Text style={styles.logoText}>GIS</Text>
        </View>
        <Text style={[styles.appName, { color: theme.text.primary }]}>App GIS</Text>
      </View>

      <View style={styles.drawerItems}>
        {menuItems.map((item) => (
          <DrawerItem
            key={item.name}
            label={item.label}
            iconName={item.icon}
            isActive={currentRoute === item.name}
            onPress={() => handleNavigation(item.route)}
          />
        ))}
      </View>

      <View style={[styles.drawerFooter, { borderTopColor: theme.border.default }]}>
        <Text style={[styles.versionText, { color: theme.text.muted }]}>Versión 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    padding: 20,
    paddingTop: 50,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  appName: {
    fontSize: 20,
    fontWeight: '600',
  },
  drawerItems: {
    flex: 1,
    paddingHorizontal: 8,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 4,
    borderLeftWidth: 3,
  },
  drawerItemLabel: {
    fontSize: 16,
    marginLeft: 16,
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
  },
});