import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

interface Event {
  id: string;
  title: string;
  date: string;
  participants: number;
  image: string;
}

export default function CreatorProfileScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { name, avatar } = (route.params as any) || {
    name: "Creador",
    avatar: "",
  };

  const [isFollowing, setIsFollowing] = useState(false);

  const creatorInfo = {
    name: name,
    avatar: avatar,
    bio: "Apasionado por la naturaleza y la sostenibilidad. Organizador de experiencias eco-turísticas en Medellín.",
    rating: 4.8,
    reviews: 127,
    followers: 342,
    events: 23,
  };

  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "Senderismo Parque Arví",
      date: "Mar 15, 2024",
      participants: 12,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=60",
    },
    {
      id: "2",
      title: "Tour Comuna 13",
      date: "Sab 18, 2024",
      participants: 8,
      image:
        "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=400&q=60",
    },
    {
      id: "3",
      title: "Kayak en Guatapé",
      date: "Dom 19, 2024",
      participants: 15,
      image:
        "https://images.unsplash.com/photo-1523928170086-2c6c14b2c92b?auto=format&fit=crop&w=400&q=60",
    },
  ];

  const reviews = [
    {
      id: "1",
      author: "Laura M.",
      rating: 5,
      text: "Excelente experiencia, muy bien organizado todo",
      date: "Hace 2 días",
    },
    {
      id: "2",
      author: "Carlos R.",
      rating: 5,
      text: "El mejor tour que he hecho en Medellín",
      date: "Hace 1 semana",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header con botón de retroceso */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#344F1F" />
          </TouchableOpacity>
          <Text className="text-lg font-bold text-primary">Perfil</Text>
          <View className="w-6" />
        </View>

        {/* Sección de perfil */}
        <View className="items-center px-5 pb-6">
          <Image
            source={{ uri: creatorInfo.avatar }}
            className="w-24 h-24 rounded-full mb-4"
          />
          <Text className="text-2xl font-bold text-primary mb-2">
            {creatorInfo.name}
          </Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="star" size={16} color="#F4991A" />
            <Text className="text-sm text-primary font-semibold ml-1">
              {creatorInfo.rating} ({creatorInfo.reviews} opiniones)
            </Text>
          </View>
          <Text className="text-base text-[#666] text-center mb-4">
            {creatorInfo.bio}
          </Text>

          {/* Estadísticas */}
          <View className="flex-row gap-6 mb-6 justify-center">
            <View className="items-center">
              <Text className="text-xl font-bold text-secondary">
                {creatorInfo.followers}
              </Text>
              <Text className="text-xs text-[#666]">Seguidores</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-secondary">
                {creatorInfo.events}
              </Text>
              <Text className="text-xs text-[#666]">Eventos</Text>
            </View>
            <View className="items-center">
              <Text className="text-xl font-bold text-secondary">
                {creatorInfo.reviews}
              </Text>
              <Text className="text-xs text-[#666]">Reseñas</Text>
            </View>
          </View>

          {/* Botones de acción */}
          <View className="flex-row gap-3 w-full">
            <TouchableOpacity
              onPress={() => setIsFollowing(!isFollowing)}
              className={`flex-1 py-3 rounded-lg ${
                isFollowing ? "bg-primary" : "bg-secondary"
              }`}
            >
              <Text className="text-white text-center font-semibold">
                {isFollowing ? "Dejar de seguir" : "Seguir"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 bg-primary py-3 rounded-lg flex-row items-center justify-center gap-2">
              <Ionicons name="chatbubble-outline" size={18} color="white" />
              <Text className="text-white font-semibold">Chat</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Próximos eventos */}
        <View className="px-5 mb-6">
          <Text className="text-xl font-bold text-primary mb-4">
            Próximos Eventos
          </Text>
          <FlatList
            scrollEnabled={false}
            data={upcomingEvents}
            renderItem={({ item }) => (
              <TouchableOpacity className="mb-3 rounded-2xl overflow-hidden bg-white shadow">
                <View className="flex-row">
                  <Image source={{ uri: item.image }} className="w-24 h-24" />
                  <View className="flex-1 p-3 justify-between">
                    <View>
                      <Text className="text-base font-semibold text-primary">
                        {item.title}
                      </Text>
                      <Text className="text-xs text-[#666] mt-1">
                        {item.date}
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Ionicons name="people" size={14} color="#F4991A" />
                      <Text className="text-xs text-[#666] ml-1">
                        {item.participants} personas
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        {/* Reseñas */}
        <View className="px-5">
          <Text className="text-xl font-bold text-primary mb-4">Reseñas</Text>
          {reviews.map((review) => (
            <View
              key={review.id}
              className="bg-white rounded-2xl p-4 mb-3 shadow"
            >
              <View className="flex-row items-center justify-between mb-2">
                <Text className="font-semibold text-primary">
                  {review.author}
                </Text>
                <View className="flex-row">
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name={i < review.rating ? "star" : "star-outline"}
                      size={14}
                      color="#F4991A"
                    />
                  ))}
                </View>
              </View>
              <Text className="text-sm text-[#333] mb-2">{review.text}</Text>
              <Text className="text-xs text-[#999]">{review.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
