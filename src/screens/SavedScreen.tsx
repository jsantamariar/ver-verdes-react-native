import React from "react";
import { View, ScrollView, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSavedDestinations } from "../contexts/SavedDestinationsContext";

const SavedScreen = () => {
  const navigation = useNavigation<any>();
  const { savedDestinations, toggleSave } = useSavedDestinations();

  // Mismos destinos que en HomeScreen - Medellín, Colombia
  const allDestinations = [
    {
      title: "Parque Arví",
      subtitle: "Reserva Natural, Santa Elena",
      thumb:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Fácil",
      duration: "4h 00m",
      rating: 4.8,
      category: "Recomendados para ti",
    },
    {
      title: "Cerro Nutibara",
      subtitle: "Pueblito Paisa, El Poblado",
      thumb:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Fácil",
      duration: "2h 00m",
      rating: 4.5,
      category: "Caminatas",
    },
    {
      title: "Comuna 13",
      subtitle: "Graffiti Tour, San Javier",
      thumb:
        "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Fácil",
      duration: "3h 00m",
      rating: 4.9,
      category: "Populares",
    },
    {
      title: "Guatapé y Peñol",
      subtitle: "Piedra del Peñol, Antioquia",
      thumb:
        "https://images.unsplash.com/photo-1523928170086-2c6c14b2c92b?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1523928170086-2c6c14b2c92b?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Moderada",
      duration: "8h 00m",
      rating: 4.9,
      category: "Pueblos",
    },
    {
      title: "Jardín Botánico",
      subtitle: "Universidad de Antioquia",
      thumb:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Fácil",
      duration: "2h 30m",
      rating: 4.7,
      category: "Mejor calificados",
    },
    {
      title: "Feria de las Flores",
      subtitle: "Festival Anual, Centro",
      thumb:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Ninguna",
      duration: "5h 00m",
      rating: 4.8,
      category: "Eventos",
    },
    {
      title: "Parque Explora",
      subtitle: "Ciencia y Tecnología, Norte",
      thumb:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Ninguna",
      duration: "4h 00m",
      rating: 4.6,
      category: "Al aire libre",
    },
    {
      title: "Metrocable Arví",
      subtitle: "Cable Aéreo, Santo Domingo",
      thumb:
        "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1569949381669-ecf31ae8e613?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Fácil",
      duration: "3h 00m",
      rating: 4.7,
      category: "Recomendados para ti",
    },
    {
      title: "Plaza Botero",
      subtitle: "Arte y Cultura, Centro",
      thumb:
        "https://images.unsplash.com/photo-1594639737324-5bc986048695?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1594639737324-5bc986048695?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Fácil",
      duration: "2h 00m",
      rating: 4.6,
      category: "Populares",
    },
    {
      title: "Santa Fe de Antioquia",
      subtitle: "Pueblo Colonial, Antioquia",
      thumb:
        "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Fácil",
      duration: "6h 00m",
      rating: 4.5,
      category: "Pueblos",
    },
    {
      title: "Parque de las Luces",
      subtitle: "Espacio Público, Centro",
      thumb:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Fácil",
      duration: "1h 30m",
      rating: 4.4,
      category: "Mejor calificados",
    },
    {
      title: "Festival del Tango",
      subtitle: "Homenaje a Gardel, Centro",
      thumb:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Ninguna",
      duration: "4h 00m",
      rating: 4.7,
      category: "Eventos",
    },
    {
      title: "Ecoparque Cerro El Volador",
      subtitle: "Reserva Ecológica, Occidente",
      thumb:
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=800&q=80",
      images: [
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80",
      ],
      difficulty: "Moderada",
      duration: "3h 00m",
      rating: 4.6,
      category: "Al aire libre",
    },
  ];

  const savedList = allDestinations.filter((d) =>
    savedDestinations.has(d.title)
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 pt-2 pb-4">
        <Text className="text-2xl font-bold text-secondary">Mis Guardados</Text>
      </View>

      {/* Lista de destinos guardados */}
      {savedList.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-[18px] text-[#666]">
            No tienes destinos guardados aún
          </Text>
          <Text className="text-[14px] text-[#999] mt-2">
            Guarda tus favoritos tocando el corazón ❤️
          </Text>
        </View>
      ) : (
        <ScrollView
          className="flex-1 px-5"
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {savedList.map((destination) => (
            <TouchableOpacity
              key={destination.title}
              className="mb-4 rounded-2xl bg-white overflow-hidden shadow"
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate("RouteDetail", {
                  title: destination.title,
                  subtitle: destination.subtitle,
                  images: destination.images,
                  difficulty: destination.difficulty,
                  duration: destination.duration,
                  rating: destination.rating,
                })
              }
            >
              <View className="flex-row">
                <View className="relative w-[120px] h-[120px]">
                  <Image
                    source={{ uri: destination.thumb }}
                    className="w-full h-full"
                  />
                  <TouchableOpacity
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1"
                    onPress={() => toggleSave(destination.title)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="heart" size={16} color="#FF6B6B" />
                  </TouchableOpacity>
                </View>
                <View className="flex-1 p-3 justify-between">
                  <View>
                    <Text
                      className="text-[16px] font-semibold text-secondary"
                      numberOfLines={1}
                    >
                      {destination.title}
                    </Text>
                    <Text className="text-[13px] text-[#666] mt-0.5">
                      {destination.subtitle}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-[12px] text-[#527A33] mr-3">
                      🏞️ {destination.difficulty}
                    </Text>
                    <Text className="text-[12px] text-[#527A33] mr-3">
                      ⏱️ {destination.duration}
                    </Text>
                    <View className="flex-row items-center">
                      <Text className="text-[12px] text-[#FFD700] mr-1">
                        ⭐
                      </Text>
                      <Text className="text-[12px] text-[#FFD700] font-semibold">
                        {destination.rating}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default SavedScreen;
