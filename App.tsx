import "./global.css";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./src/navigation/MainStack";

export default function App() {
  return (
    <View className="flex-1 bg-background">
      <StatusBar style="dark" />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </View>
  );
}
