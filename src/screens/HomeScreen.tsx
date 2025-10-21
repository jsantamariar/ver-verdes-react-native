import React, { useMemo, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useSavedDestinations } from "../contexts/SavedDestinationsContext";
import NotificationsSlide from "../components/NotificationsSlide";

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { savedDestinations, toggleSave } = useSavedDestinations();

  const [query, setQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const categories = [
    "Todos",
    "Recomendados para ti",
    "Populares",
    "Mejor calificados",
    "Caminatas",
    "Pueblos",
    "Eventos",
    "Al aire libre",
  ];

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
      price: 45000,
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
      price: 35000,
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
      price: 55000,
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
      price: 55000,
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
      price: 40000,
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
      price: 45000,
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
      price: 38000,
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
      price: 40000,
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
      price: 38000,
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
      price: 35000,
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
      price: 30000,
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
      price: 40000,
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
      price: 38000,
      category: "Al aire libre",
    },
  ];

  const getFilteredDestinations = (category: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    return allDestinations.filter((destination) => {
      const matchTitle =
        !normalizedQuery ||
        destination.title.toLowerCase().includes(normalizedQuery);
      const matchCategory =
        category === "Todos" || destination.category === category;
      return matchTitle && matchCategory;
    });
  };

  const renderDestinationCard = (destination: any) => {
    const isSaved = savedDestinations.has(destination.title);
    return (
      <TouchableOpacity
        key={destination.title}
        className="w-[220px] h-[220px] mr-4 rounded-2xl bg-white overflow-hidden shadow"
        activeOpacity={0.9}
        onPress={() =>
          navigation.navigate("RouteDetail", {
            title: destination.title,
            subtitle: destination.subtitle,
            images: destination.images,
            difficulty: destination.difficulty,
            duration: destination.duration,
            rating: destination.rating,
            price: destination.price,
          })
        }
      >
        <View className="relative">
          <Image source={{ uri: destination.thumb }} className="w-full h-40" />
          <TouchableOpacity
            className="absolute top-2 right-2 bg-white/80 rounded-full p-2"
            onPress={() => toggleSave(destination.title)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isSaved ? "heart" : "heart-outline"}
              size={20}
              color={isSaved ? "#F4991A" : "#666"}
            />
          </TouchableOpacity>
        </View>
        <View className="p-3 flex-1">
          <Text
            className="text-[16px] font-semibold text-primary"
            numberOfLines={1}
          >
            {destination.title}
          </Text>
          <Text className="text-[13px] text-[#666] mt-0.5" numberOfLines={1}>
            {destination.subtitle}
          </Text>
          <View className="flex-row items-center mt-2">
            <Text className="text-[12px] text-primary mr-3">
              🏞️ {destination.difficulty}
            </Text>
            <Text className="text-[12px] text-primary mr-3">
              ⏱️ {destination.duration}
            </Text>
            <View className="flex-row items-center">
              <Text className="text-[12px] text-secondary mr-1">⭐</Text>
              <Text className="text-[12px] text-secondary font-semibold">
                {destination.rating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="px-5 pt-2 pb-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Feather name="user" size={24} color="black" />
          <Text className="text-[18px] font-semibold text-primary">
            Hola, Jorge
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowNotifications(true)}
          className="p-2 rounded-full bg-white/70"
        >
          <AntDesign name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Título principal con fuente Bonfire */}
      <View className="px-5 py-5 mb-3">
        <Text
          className="text-3xl tracking-widest text-center font-bold text-primary"
          style={{ fontFamily: "Bonfire" }}
        >
          Explora tu nuevo destino
        </Text>
      </View>

      {/* TextField de búsqueda */}
      <View className="px-5 mb-5">
        <TextInput
          className="bg-white border border-gray-300 rounded-xl px-4 py-3"
          placeholder="Buscar por título"
          placeholderTextColor="#9ca3af"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Carruseles por categoría */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {categories.map((category) => {
          const filteredDests = getFilteredDestinations(category);
          if (filteredDests.length === 0) return null;

          return (
            <View key={category} className="mb-6">
              <View className="px-5 mb-3">
                <Text className="text-[18px] font-bold text-primary">
                  {category}
                </Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-5"
              >
                {filteredDests.map((destination) =>
                  renderDestinationCard(destination)
                )}
              </ScrollView>
            </View>
          );
        })}
        {query &&
          categories.every(
            (cat) => getFilteredDestinations(cat).length === 0
          ) && (
            <View className="px-5 py-10 items-center">
              <Text className="text-[16px] text-[#666]">
                No hay destinos que coincidan con "{query}"
              </Text>
            </View>
          )}
      </ScrollView>
      <NotificationsSlide
        isVisible={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
