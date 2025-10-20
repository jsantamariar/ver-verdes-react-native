import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSavedDestinations } from "../contexts/SavedDestinationsContext";

const { height } = Dimensions.get("window");

type RouteParams = {
  title?: string;
  subtitle?: string;
  images?: string[];
  difficulty?: string;
  duration?: string;
  rating?: number;
};

export default function RouteDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params || {}) as RouteParams;
  const { savedDestinations, toggleSave } = useSavedDestinations();

  const images =
    params.images && params.images.length > 0
      ? params.images
      : [
          "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
        ];

  const title = params.title || "Sendero Bosque Nuboso";
  const subtitle = params.subtitle || "Parque Nacional Monteverde";
  const difficulty = params.difficulty || "Moderada";
  const duration = params.duration || "3h 45m";
  const rating = params.rating || 4.8;

  const mainImage = images[0];
  const galleryImages = images.slice(1);
  const isSaved = savedDestinations.has(title);

  const reviews = [
    {
      user: "María P.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60",
      rating: 5,
      text: "Ruta preciosa, súper verde y bien señalizada. Recomendadísima.",
    },
    {
      user: "Carlos R.",
      avatar:
        "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=200&q=60",
      rating: 4,
      text: "Excelente experiencia, el impacto es bajo y la fauna increíble.",
    },
    {
      user: "Lucía G.",
      avatar:
        "https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&w=200&q=60",
      rating: 5,
      text: "Perfecto para ir en familia, duración moderada y vistas espectaculares.",
    },
  ];

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} className="text-[#FFD700] text-[14px]">
          {i <= rating ? "★" : "☆"}
        </Text>
      );
    }
    return <View className="flex-row">{stars}</View>;
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header flotante sobre la imagen */}
      <SafeAreaView className="absolute top-0 left-0 right-0 z-10">
        <View className="flex-row items-center justify-between px-4 py-2">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="bg-white/80 rounded-full p-2"
          >
            <Text className="text-2xl text-secondary">‹</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleSave(title)}
            className="bg-white/80 rounded-full p-2"
            activeOpacity={0.7}
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={24}
              color={isSaved ? "#FF6B6B" : "#666"}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView className="flex-1">
        {/* Foto principal de portada - 50% de la pantalla */}
        <View style={{ height: height * 0.5 }}>
          <Image
            source={{ uri: mainImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Contenido principal */}
        <View className="bg-background">
          {/* Título y subtítulo */}
          <View className="px-5 pt-5 pb-3">
            <Text className="text-3xl font-bold text-secondary">{title}</Text>
            <Text className="text-base text-[#666] mt-2">{subtitle}</Text>
          </View>

          {/* Características generales */}
          <View className="px-5 py-4 bg-white rounded-2xl mx-5 mb-5 shadow">
            <Text className="text-lg font-bold text-secondary mb-3">
              Características
            </Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <Text className="text-2xl mb-1">🏞️</Text>
                <Text className="text-xs text-[#666] mb-1">Dificultad</Text>
                <Text className="text-sm font-semibold text-secondary text-center">
                  {difficulty}
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl mb-1">⏱️</Text>
                <Text className="text-xs text-[#666] mb-1">Duración</Text>
                <Text className="text-sm font-semibold text-secondary text-center">
                  {duration}
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl mb-1">⭐</Text>
                <Text className="text-xs text-[#666] mb-1">Calificación</Text>
                <Text className="text-sm font-semibold text-[#FFD700] text-center">
                  {rating}
                </Text>
              </View>
            </View>
          </View>

          {/* Descripción */}
          <View className="px-5 mb-5">
            <Text className="text-lg font-bold text-secondary mb-3">
              Descripción
            </Text>
            <Text className="text-base leading-6 text-[#333]">
              Este sendero recorre un ecosistema único de bosque nuboso. El
              recorrido ofrece paisajes espectaculares, miradores naturales y
              gran diversidad de flora y fauna. Se recomienda llevar calzado
              adecuado, agua y respetar las señalizaciones para minimizar el
              impacto ambiental. Ideal para amantes de la naturaleza y la
              fotografía.
            </Text>
          </View>

          {/* Galería de imágenes */}
          {galleryImages.length > 0 && (
            <View className="mb-5">
              <View className="px-5 mb-3">
                <Text className="text-lg font-bold text-secondary">
                  Galería
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-5"
              >
                {galleryImages.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    className="w-[280px] h-[200px] rounded-2xl mr-3"
                    resizeMode="cover"
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* Reseñas */}
          <View className="px-5 mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-secondary">
                Reseñas ({reviews.length})
              </Text>
              <View className="flex-row items-center">
                <Text className="text-[#FFD700] text-lg mr-1">⭐</Text>
                <Text className="text-base font-semibold text-secondary">
                  {rating}
                </Text>
              </View>
            </View>
            {reviews.map((review, index) => (
              <View key={index} className="bg-white rounded-xl p-4 mb-3 shadow">
                <View className="flex-row items-start">
                  <Image
                    source={{ uri: review.avatar }}
                    className="w-12 h-12 rounded-full mr-3"
                  />
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="font-semibold text-base text-secondary">
                        {review.user}
                      </Text>
                      {renderStars(review.rating)}
                    </View>
                    <Text className="text-[#333] leading-5 mt-2">
                      {review.text}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
