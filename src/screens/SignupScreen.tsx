import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../services/useSupabase";
import { useNavigation } from "@react-navigation/native";

export default function SignupScreen() {
  const { signup } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    setError(null);
    setSuccess(false);
    const { error } = await signup(email, password, nombre);
    if (error) setError(error);
    else setSuccess(true);
  };
  return (
    <View className="flex-1 justify-center px-5 bg-background">
      <Text className="text-2xl font-bold mb-4 self-center text-secondary">
        Crear Cuenta
      </Text>
      {error && <Text className="text-red-600 mb-2">{error}</Text>}
      {success && (
        <Text className="text-green-600 mb-2">
          Registro exitoso. Revisa tu correo.
        </Text>
      )}
      <TextInput
        className="border border-gray-300 rounded-lg px-3 py-2 mb-2 bg-white"
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        placeholderTextColor="#9ca3af"
      />
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
        onPress={handleSignup}
      >
        <Text className="text-white text-center font-semibold">
          Registrarme
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-secondary/10 rounded-lg py-3"
        onPress={() => navigation.goBack()}
      >
        <Text className="text-secondary text-center font-semibold">Volver</Text>
      </TouchableOpacity>
    </View>
  );
}
