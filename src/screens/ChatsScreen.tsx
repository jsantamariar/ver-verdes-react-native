import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  isOnline: boolean;
}

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Juan García",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60",
    lastMessage: "¿A qué hora es el evento de senderismo?",
    timestamp: "Hace 2 minutos",
    unread: 3,
    isOnline: true,
  },
  {
    id: "2",
    name: "María López",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=60",
    lastMessage: "Perfecto, nos vemos en el Parque Arví",
    timestamp: "Hace 15 minutos",
    unread: 1,
    isOnline: true,
  },
  {
    id: "3",
    name: "Carlos Martínez",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=60",
    lastMessage: "He confirmado tu participación en el tour",
    timestamp: "Hace 1 hora",
    unread: 0,
    isOnline: false,
  },
  {
    id: "4",
    name: "Ana Rodríguez",
    avatar:
      "https://images.unsplash.com/photo-1507114388589-ce3a88f129d7?auto=format&fit=crop&w=400&q=60",
    lastMessage: "¿Necesitas más información sobre la ruta?",
    timestamp: "Hace 3 horas",
    unread: 0,
    isOnline: true,
  },
  {
    id: "5",
    name: "Pedro Sánchez",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=60",
    lastMessage: "Gracias por participar en nuestro evento",
    timestamp: "Hace 1 día",
    unread: 0,
    isOnline: false,
  },
];

export default function ChatsScreen() {
  const navigation = useNavigation<any>();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = mockChats.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 pt-4 pb-4">
        <Text className="text-2xl font-bold text-primary">Chats</Text>
      </View>

      {/* Search bar */}
      <View className="px-5 mb-4">
        <View className="bg-white rounded-full px-4 py-3 flex-row items-center">
          <Ionicons name="search" size={18} color="#9ca3af" />
          <TextInput
            className="flex-1 ml-2 text-base"
            placeholder="Buscar chats..."
            placeholderTextColor="#9ca3af"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Chat list */}
      <ScrollView
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredChats.length > 0 ? (
          filteredChats.map((chat) => (
            <TouchableOpacity
              key={chat.id}
              className="flex-row items-center bg-white rounded-2xl p-4 mb-3 shadow"
              onPress={() =>
                navigation.navigate("ChatDetail", {
                  chatId: chat.id,
                  name: chat.name,
                  avatar: chat.avatar,
                  isOnline: chat.isOnline,
                })
              }
              activeOpacity={0.7}
            >
              {/* Avatar */}
              <View className="relative mr-4">
                <Image
                  source={{ uri: chat.avatar }}
                  className="w-16 h-16 rounded-full"
                />
                {chat.isOnline && (
                  <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                )}
              </View>

              {/* Chat info */}
              <View className="flex-1">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-base font-semibold text-primary">
                    {chat.name}
                  </Text>
                  <Text className="text-xs text-[#999]">{chat.timestamp}</Text>
                </View>
                <Text className="text-sm text-[#666] mb-1" numberOfLines={1}>
                  {chat.lastMessage}
                </Text>
              </View>

              {/* Unread badge */}
              {chat.unread > 0 && (
                <View className="ml-2 bg-secondary rounded-full w-6 h-6 justify-center items-center">
                  <Text className="text-white text-xs font-bold">
                    {chat.unread}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Ionicons name="chatbubbles-outline" size={48} color="#9ca3af" />
            <Text className="text-base text-[#666] mt-4">
              No hay chats disponibles
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
