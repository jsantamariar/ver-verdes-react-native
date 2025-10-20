import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../services/useSupabase";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const handleLogin = async () => {
    setError(null);
    const { error } = await login(email, password);
    if (error) setError(error);
  };
  return (
    <View className="flex-1 justify-center px-5 bg-background">
      <Text className="text-2xl font-bold mb-4 self-center text-secondary">
        Iniciar Sesión
      </Text>
      {error && <Text className="text-red-600 mb-2">{error}</Text>}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-2 bg-white"
        placeholder="Correo"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#9ca3af"
      />
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-3 bg-white"
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#9ca3af"
      />
      <TouchableOpacity
        className="bg-primary rounded-lg py-3 mb-2"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-semibold">Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-secondary/10 rounded-lg py-3"
        onPress={() => navigation.navigate("Signup" as never)}
      >
        <Text className="text-secondary text-center font-semibold">
          Registrarse
        </Text>
      </TouchableOpacity>
    </View>
  );
}
