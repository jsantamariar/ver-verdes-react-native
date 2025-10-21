import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../services/useSupabase";

export default function LoginScreen() {
  const navigation = useNavigation<any>();
  const { sendOTP } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico");
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Por favor ingresa un correo electrónico válido");
      return;
    }

    setLoading(true);

    const { error } = await sendOTP(email);
    setLoading(false);

    if (error) {
      Alert.alert("Error", error);
    } else {
      Alert.alert(
        "Código enviado",
        `Hemos enviado un código de verificación a ${email}`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("VerifyOTP", { email }),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center px-8">
          {/* Título */}
          <View className="mb-10">
            <Text
              className="text-4xl font-bold text-primary text-center mb-3"
              style={{ fontFamily: "Bonfire" }}
            >
              Bienvenido
            </Text>
            <Text className="text-base text-center text-[#666]">
              Ingresa tu correo para continuar
            </Text>
          </View>

          {/* Campo de email */}
          <View className="mb-6">
            <Text className="text-sm font-semibold text-primary mb-2">
              Correo Electrónico
            </Text>
            <TextInput
              className="bg-white border border-gray-300 rounded-xl px-4 py-4 text-base"
              placeholder="tu@email.com"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!loading}
            />
          </View>

          {/* Botón de enviar código */}
          <TouchableOpacity
            className={`rounded-xl py-4 shadow-lg ${
              loading ? "bg-secondary/50" : "bg-secondary"
            }`}
            onPress={handleSendOTP}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text className="text-white text-center text-lg font-bold">
              {loading ? "Enviando..." : "Enviar código"}
            </Text>
          </TouchableOpacity>

          {/* Información adicional */}
          <View className="mt-8">
            <Text className="text-sm text-center text-[#999] leading-5">
              Te enviaremos un código de verificación a tu correo electrónico
              para iniciar sesión de forma segura
            </Text>
          </View>

          {/* Botón de volver */}
          <TouchableOpacity
            className="mt-8 py-3"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text className="text-primary text-center font-semibold">
              Volver
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
