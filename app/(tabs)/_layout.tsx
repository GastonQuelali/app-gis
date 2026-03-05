import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#007AFF" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={26} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="arcgis"
        options={{
          title: "ArcGIS",
          tabBarIcon: ({ color }) => (
            <Ionicons name="map" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
