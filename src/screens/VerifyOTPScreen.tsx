import React, { useState, useRef } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../services/useSupabase";

export default function VerifyOTPScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { verifyOTP, sendOTP } = useAuth();
  const { email } = (route.params as { email: string }) || { email: "" };

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOTPChange = (text: string, index: number) => {
    // Solo permitir números
    if (text && !/^\d+$/.test(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus al siguiente campo
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Retroceder al campo anterior al presionar backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpCode = otp.join("");

    if (otpCode.length !== 6) {
      Alert.alert("Error", "Por favor ingresa el código completo de 6 dígitos");
      return;
    }

    setLoading(true);
    const { error } = await verifyOTP(email, otpCode);
    setLoading(false);

    if (error) {
      Alert.alert("Error", error);
    } else {
      // Navegar a la app principal
      navigation.reset({
        index: 0,
        routes: [{ name: "Tabs" }],
      });
    }
  };

  const handleResendCode = async () => {
    const { error } = await sendOTP(email);
    if (error) {
      Alert.alert("Error", error);
    } else {
      Alert.alert(
        "Código reenviado",
        `Hemos enviado un nuevo código a ${email}`
      );
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
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
              Verificación
            </Text>
            <Text className="text-base text-center text-[#666]">
              Ingresa el código de 6 dígitos que enviamos a
            </Text>
            <Text className="text-base text-center text-primary font-semibold mt-1">
              {email}
            </Text>
          </View>

          {/* Campos de OTP */}
          <View className="flex-row justify-between mb-8 px-4">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                className="w-12 h-16 bg-white border-2 border-gray-300 rounded-xl text-center text-2xl font-bold text-primary"
                value={digit}
                onChangeText={(text) => handleOTPChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                editable={!loading}
              />
            ))}
          </View>

          {/* Botón de verificar */}
          <TouchableOpacity
            className={`rounded-xl py-4 shadow-lg mb-4 ${
              loading ? "bg-secondary/50" : "bg-secondary"
            }`}
            onPress={handleVerifyOTP}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text className="text-white text-center text-lg font-bold">
              {loading ? "Verificando..." : "Verificar código"}
            </Text>
          </TouchableOpacity>

          {/* Reenviar código */}
          <View className="flex-row justify-center items-center">
            <Text className="text-sm text-[#666]">
              ¿No recibiste el código?{" "}
            </Text>
            <TouchableOpacity onPress={handleResendCode} disabled={loading}>
              <Text className="text-sm text-secondary font-semibold">
                Reenviar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Botón de volver */}
          <TouchableOpacity
            className="mt-8 py-3"
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
          >
            <Text className="text-primary text-center font-semibold">
              Cambiar correo
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
