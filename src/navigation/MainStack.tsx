import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import VerifyOTPScreen from "../screens/VerifyOTPScreen";
import HomeScreen from "../screens/HomeScreen";
import ChatsScreen from "../screens/ChatsScreen";
import ChatDetailScreen from "../screens/ChatDetailScreen";
import SavedScreen from "../screens/SavedScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RouteDetailScreen from "../screens/RouteDetailScreen";
import CreatorProfileScreen from "../screens/CreatorProfileScreen";
import PaymentScreen from "../screens/PaymentScreen";
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
            case "Chats":
              iconName = "chatbubbles-outline";
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
        tabBarActiveTintColor: "#344F1F",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Guardados" component={SavedScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainStack() {
  return (
    <SavedDestinationsProvider>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTPScreen}
          options={{ headerShown: false }}
        />
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
        <Stack.Screen
          name="ChatDetail"
          component={ChatDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreatorProfile"
          component={CreatorProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SavedDestinationsProvider>
  );
}
