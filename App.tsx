import "./global.css";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "./src/services/useSupabase";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Bonfire: require("./src/assets/fonts/bonfire.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <View className="flex-1 bg-background">
        <StatusBar style="dark" />
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
}
