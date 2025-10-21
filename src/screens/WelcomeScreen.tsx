import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-8">
        {/* Logo */}
        <Image
          source={require("../assets/ver-verdes-logo-no-bg.png")}
          className="w-80 h-80 mb-0"
          resizeMode="contain"
        />

        {/* Título con fuente Bonfire */}
        {/* <Text
          className="text-5xl font-bold text-primary text-center mb-4"
          style={{ fontFamily: "Bonfire" }}
        >
          Ver Verdes
        </Text> */}

        {/* Subtítulo */}
        <Text className="text-lg text-center text-[#666] mb-12 px-4">
          Descubre experiencias únicas y sostenibles en la naturaleza
        </Text>

        {/* Botones */}
        <View className="w-full px-4">
          {/* Botón de explorar sin login */}
          <TouchableOpacity
            className="bg-secondary rounded-full py-4 shadow-lg mb-4"
            onPress={() => navigation.navigate("Tabs")}
            activeOpacity={0.8}
          >
            <Text className="text-white text-center text-lg font-bold">
              Explorar
            </Text>
          </TouchableOpacity>

          {/* Botón de iniciar sesión */}
          <TouchableOpacity
            className="bg-primary/10 rounded-full py-4 mb-4"
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.8}
          >
            <Text className="text-primary text-center text-lg font-bold">
              Iniciar sesión
            </Text>
          </TouchableOpacity>

          {/* Botón de organizador */}
          <TouchableOpacity
            className="bg-primary/10 rounded-full py-4"
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.8}
          >
            <Text className="text-primary text-center text-lg font-bold">
              Organizador
            </Text>
          </TouchableOpacity>
        </View>

        {/* Versión */}
        <Text className="text-[#999] text-sm mt-12">Versión 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}
