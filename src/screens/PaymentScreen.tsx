import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SuccessModal from "../components/SuccessModal";

export default function PaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const {
    eventTitle,
    eventDate,
    price = 50000,
  } = (route.params as any) || {
    eventTitle: "Evento",
    eventDate: "2024-03-15",
    price: 50000,
  };

  // Payment form state
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handlePayment = () => {
    if (paymentMethod === "card") {
      if (!cardNumber || !cardholderName || !expiryDate || !cvv) {
        Alert.alert(
          "Error",
          "Por favor completa todos los campos de la tarjeta"
        );
        return;
      }
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#344F1F" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-primary">Pagar</Text>
          <View className="w-6" />
        </View>

        {/* Resumen del evento */}
        <View className="px-5 mb-6">
          <View className="bg-white rounded-2xl p-5 shadow">
            <Text className="text-base font-semibold text-primary mb-2">
              Resumen del Evento
            </Text>
            <View className="border-t border-gray-200 pt-3 mt-3">
              <View className="flex-row justify-between mb-2">
                <Text className="text-sm text-[#666]">Evento:</Text>
                <Text className="text-sm font-semibold text-[#333]">
                  {eventTitle}
                </Text>
              </View>
              <View className="flex-row justify-between mb-4">
                <Text className="text-sm text-[#666]">Fecha:</Text>
                <Text className="text-sm font-semibold text-[#333]">
                  {new Date(eventDate).toLocaleDateString("es-CO")}
                </Text>
              </View>
              <View className="flex-row justify-between border-t border-gray-200 pt-3">
                <Text className="text-base font-bold text-primary">Total:</Text>
                <Text className="text-base font-bold text-secondary">
                  {formatCurrency(price)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Métodos de pago */}
        <View className="px-5 mb-6">
          <Text className="text-lg font-bold text-primary mb-4">
            Método de Pago
          </Text>

          {/* Tarjeta de crédito */}
          <TouchableOpacity
            onPress={() => setPaymentMethod("card")}
            className={`rounded-2xl p-4 mb-3 border-2 ${
              paymentMethod === "card"
                ? "border-secondary bg-orange-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={
                  paymentMethod === "card"
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={24}
                color={paymentMethod === "card" ? "#F4991A" : "#999"}
              />
              <Text className="text-base font-semibold text-primary ml-3">
                Tarjeta de Crédito
              </Text>
            </View>
          </TouchableOpacity>

          {/* Billetera digital */}
          <TouchableOpacity
            onPress={() => setPaymentMethod("wallet")}
            className={`rounded-2xl p-4 border-2 ${
              paymentMethod === "wallet"
                ? "border-secondary bg-orange-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <View className="flex-row items-center">
              <Ionicons
                name={
                  paymentMethod === "wallet"
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={24}
                color={paymentMethod === "wallet" ? "#F4991A" : "#999"}
              />
              <Text className="text-base font-semibold text-primary ml-3">
                Billetera Digital (Nequi, Daviplata)
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Formulario de tarjeta */}
        {paymentMethod === "card" && (
          <View className="px-5 mb-6">
            <Text className="text-lg font-bold text-primary mb-4">
              Información de la Tarjeta
            </Text>

            <TextInput
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-3 text-base"
              placeholder="Número de tarjeta"
              placeholderTextColor="#9ca3af"
              value={cardNumber}
              onChangeText={setCardNumber}
              keyboardType="numeric"
              maxLength={16}
            />

            <TextInput
              className="bg-white border border-gray-300 rounded-xl px-4 py-3 mb-3 text-base"
              placeholder="Nombre del titular"
              placeholderTextColor="#9ca3af"
              value={cardholderName}
              onChangeText={setCardholderName}
            />

            <View className="flex-row gap-3 mb-3">
              <TextInput
                className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-base"
                placeholder="MM/AA"
                placeholderTextColor="#9ca3af"
                value={expiryDate}
                onChangeText={setExpiryDate}
                maxLength={5}
              />
              <TextInput
                className="flex-1 bg-white border border-gray-300 rounded-xl px-4 py-3 text-base"
                placeholder="CVV"
                placeholderTextColor="#9ca3af"
                value={cvv}
                onChangeText={setCvv}
                keyboardType="numeric"
                maxLength={4}
              />
            </View>
          </View>
        )}

        {/* Términos y condiciones */}
        <View className="px-5 mb-6">
          <View className="flex-row items-start">
            <Ionicons name="checkbox" size={20} color="#65AA68" />
            <Text className="text-xs text-[#666] ml-2 flex-1">
              Acepto los términos y condiciones y la política de privacidad
            </Text>
          </View>
        </View>

        {/* Botón de pago */}
        <View className="px-5">
          <TouchableOpacity
            onPress={handlePayment}
            disabled={isProcessing}
            className={`rounded-xl py-4 ${
              isProcessing ? "bg-secondary/50" : "bg-secondary"
            }`}
          >
            <Text className="text-white text-center text-lg font-bold">
              {isProcessing
                ? "Procesando..."
                : `Pagar ${formatCurrency(price)}`}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de éxito */}
      <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          navigation.reset({
            index: 0,
            routes: [{ name: "Tabs" }],
          });
        }}
        title="¡Reserva Exitosa!"
        message={`Tu reserva para "${eventTitle}" ha sido confirmada. Te esperamos el ${new Date(
          eventDate
        ).toLocaleDateString("es-CO")}.`}
        buttonText="¡Entendido!"
      />
    </SafeAreaView>
  );
}
