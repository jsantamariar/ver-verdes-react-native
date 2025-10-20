import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RouteDetailScreen from "../screens/RouteDetailScreen";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SavedDestinationsProvider } from "../contexts/SavedDestinationsContext";

function Placeholder({ nombre }: { nombre: string }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Pantalla: {nombre}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          switch (route.name) {
            case "Inicio":
              iconName = "home-outline";
              break;
            case "Explorar":
              iconName = "earth-outline";
              break;
            case "Guardados":
              iconName = "bookmark-outline";
              break;
            case "Perfil":
              iconName = "person-circle-outline";
              break;
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#65AA68",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen
        name="Explorar"
        children={() => <Placeholder nombre="Explorar" />}
      />
      <Tab.Screen name="Guardados" component={SavedScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainStack() {
  return (
    <SavedDestinationsProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RouteDetail"
          component={RouteDetailScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SavedDestinationsProvider>
  );
}
