import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface SuccessModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  onClose,
  title,
  message,
  buttonText,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-3xl p-6 w-[85%] items-center">
          {/* Ícono de éxito */}
          <View className="w-20 h-20 rounded-full bg-[#E8F5E9] items-center justify-center mb-4">
            <Ionicons name="checkmark-circle" size={50} color="#344F1F" />
          </View>

          {/* Título */}
          <Text className="text-2xl font-bold text-primary text-center mb-2">
            {title}
          </Text>

          {/* Mensaje */}
          <Text className="text-base text-[#666] text-center mb-6">
            {message}
          </Text>

          {/* Botón */}
          <TouchableOpacity
            onPress={onClose}
            className="bg-secondary w-full rounded-xl py-4"
          >
            <Text className="text-white text-center text-lg font-bold">
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;
