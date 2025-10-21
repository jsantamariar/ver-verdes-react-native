import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

const mockMessages: Message[] = [
  {
    id: "1",
    text: "Hola, gracias por registrarte en nuestro evento",
    timestamp: "09:30",
    isOwn: false,
  },
  {
    id: "2",
    text: "Hola! Gracias a ti por la invitación",
    timestamp: "09:31",
    isOwn: true,
  },
  {
    id: "3",
    text: "¿A qué hora comienza exactamente el senderismo?",
    timestamp: "09:32",
    isOwn: true,
  },
  {
    id: "4",
    text: "Comienza a las 8:00 AM en la entrada del Parque Arví",
    timestamp: "09:33",
    isOwn: false,
  },
  {
    id: "5",
    text: "Llevaremos refrigerios y agua para todos",
    timestamp: "09:34",
    isOwn: false,
  },
  {
    id: "6",
    text: "Perfecto, ¿cuál es el nivel de dificultad?",
    timestamp: "09:35",
    isOwn: true,
  },
  {
    id: "7",
    text: "Es nivel fácil, perfecto para principiantes. Dura alrededor de 4 horas",
    timestamp: "09:36",
    isOwn: false,
  },
  {
    id: "8",
    text: "Excelente, allá estaré",
    timestamp: "09:37",
    isOwn: true,
  },
];

export default function ChatDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, avatar, isOnline } = (route.params as any) || {
    name: "Usuario",
    avatar: "",
    isOnline: false,
  };

  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: (messages.length + 1).toString(),
        text: inputText,
        timestamp: new Date().toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
      };
      setMessages([...messages, newMessage]);
      setInputText("");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-white px-4 py-4 flex-row items-center justify-between border-b border-gray-200">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-3"
          >
            <Ionicons name="chevron-back" size={24} color="#344F1F" />
          </TouchableOpacity>

          <View className="relative mr-3">
            <Image
              source={{ uri: avatar }}
              className="w-12 h-12 rounded-full"
            />
            {isOnline && (
              <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border border-white" />
            )}
          </View>

          <View>
            <Text className="text-base font-semibold text-primary">{name}</Text>
            <Text className="text-xs text-[#999]">
              {isOnline ? "En línea" : "Sin conexión"}
            </Text>
          </View>
        </View>

        <TouchableOpacity className="p-2">
          <Ionicons name="call" size={20} color="#344F1F" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          className="flex-1 px-4 py-4"
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              className={`mb-3 flex-row ${
                message.isOwn ? "justify-end" : "justify-start"
              }`}
            >
              <View
                className={`max-w-xs px-4 py-3 rounded-2xl ${
                  message.isOwn
                    ? "bg-secondary"
                    : "bg-white border border-gray-200"
                }`}
              >
                <Text
                  className={`text-base ${
                    message.isOwn ? "text-white" : "text-[#333]"
                  }`}
                >
                  {message.text}
                </Text>
                <Text
                  className={`text-xs mt-1 ${
                    message.isOwn ? "text-orange-100" : "text-[#999]"
                  }`}
                >
                  {message.timestamp}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input area */}
        <View className="bg-white border-t border-gray-200 px-4 py-3 flex-row items-center gap-2">
          <TouchableOpacity className="p-2">
            <Ionicons name="add-circle" size={24} color="#F4991A" />
          </TouchableOpacity>

          <TextInput
            className="flex-1 bg-gray-100 border border-gray-300 rounded-full px-4 py-2 text-base"
            placeholder="Escribe un mensaje..."
            placeholderTextColor="#9ca3af"
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />

          <TouchableOpacity
            onPress={handleSendMessage}
            className="p-2"
            disabled={!inputText.trim()}
          >
            <Ionicons
              name="send"
              size={20}
              color={inputText.trim() ? "#F4991A" : "#ccc"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
