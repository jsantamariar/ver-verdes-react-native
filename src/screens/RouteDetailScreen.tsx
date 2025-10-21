import { useState } from "react";
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
import { Calendar } from "react-native-calendars";
import ImageGalleryModal from "../components/ImageGalleryModal";

const { height } = Dimensions.get("window");

type RouteParams = {
  title?: string;
  subtitle?: string;
  images?: string[];
  difficulty?: string;
  duration?: string;
  rating?: number;
  price?: number;
};

export default function RouteDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const params = (route.params || {}) as RouteParams;
  const { savedDestinations, toggleSave } = useSavedDestinations();

  // Calendar state
  const [selectedDate, setSelectedDate] = useState("2025-10-15");
  const defaultEventDate = "2025-10-15";
  const defaultEventPrice = 50000;

  // Gallery modal state
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Available dates for the event
  const availableDates = [
    "2025-10-15",
    "2025-10-22",
    "2025-10-29",
    "2025-11-05",
    "2025-11-12",
    "2025-11-19",
    "2025-11-26",
  ];

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
  const price = params.price || 50000;

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
        <Text key={i} className="text-secondary text-[14px]">
          {i <= rating ? "★" : "☆"}
        </Text>
      );
    }
    return <View className="flex-row">{stars}</View>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Open gallery modal
  const openGalleryModal = (index: number) => {
    setSelectedImageIndex(index);
    setShowGalleryModal(true);
  };

  // Generate marked dates for calendar
  const getMarkedDates = () => {
    const markedDates: any = {};

    // Mark available dates
    availableDates.forEach((date) => {
      markedDates[date] = {
        marked: true,
        dotColor: "#F4991A",
        selectedColor: "#F4991A",
        selectedTextColor: "#fff",
        disabled: false,
      };
    });

    // Mark selected date
    if (selectedDate && availableDates.includes(selectedDate)) {
      markedDates[selectedDate] = {
        ...markedDates[selectedDate],
        selected: true,
        selectedColor: "#344F1F",
        selectedTextColor: "#fff",
      };
    }

    return markedDates;
  };

  // Generate disabled dates for calendar
  const getDisabledDates = () => {
    const disabledDates: any = {};
    const currentYear = 2025;
    const currentMonth = 9; // October (0-indexed)

    // Get all days in current month (October 2025)
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    // Get all days in next month (November 2025)
    const nextMonthDays = new Date(currentYear, currentMonth + 2, 0).getDate();

    // Disable all days in current month that are not available
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      if (!availableDates.includes(dateString)) {
        disabledDates[dateString] = {
          disabled: true,
          disableTouchEvent: true,
        };
      }
    }

    // Disable all days in next month that are not available
    for (let day = 1; day <= nextMonthDays; day++) {
      const dateString = `${currentYear}-${String(currentMonth + 2).padStart(
        2,
        "0"
      )}-${String(day).padStart(2, "0")}`;
      if (!availableDates.includes(dateString)) {
        disabledDates[dateString] = {
          disabled: true,
          disableTouchEvent: true,
        };
      }
    }

    return disabledDates;
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header flotante sobre la imagen */}
      <View className="absolute top-0 left-0 right-0 z-10">
        <SafeAreaView>
          <View className="flex-row items-center justify-between px-4 py-3">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-white/90 rounded-full p-3 shadow-sm"
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={24} color="#344F1F" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleSave(title)}
              className="bg-white/90 rounded-full p-3 shadow-sm"
              activeOpacity={0.8}
            >
              <Ionicons
                name={isSaved ? "heart" : "heart-outline"}
                size={24}
                color={isSaved ? "#F4991A" : "#666"}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      <ScrollView className="flex-1">
        {/* Foto principal de portada - 50% de la pantalla */}
        <TouchableOpacity
          style={{ height: height * 0.5 }}
          onPress={() => openGalleryModal(0)}
          activeOpacity={0.9}
        >
          <Image
            source={{ uri: mainImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </TouchableOpacity>

        {/* Contenido principal */}
        <View className="bg-background">
          {/* Título y subtítulo */}
          <View className="px-5 pt-5 pb-3">
            <Text className="text-3xl font-bold text-primary">{title}</Text>
            <Text className="text-base text-[#666] mt-2">{subtitle}</Text>
          </View>

          {/* Características generales */}
          <View className="px-5 py-4 bg-white rounded-2xl mx-5 mb-5 shadow">
            <Text className="text-lg font-bold text-primary mb-3">
              Características
            </Text>
            <View className="flex-row justify-between">
              <View className="items-center flex-1">
                <Text className="text-2xl mb-1">🏞️</Text>
                <Text className="text-xs text-[#666] mb-1">Dificultad</Text>
                <Text className="text-sm font-semibold text-primary text-center">
                  {difficulty}
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl mb-1">⏱️</Text>
                <Text className="text-xs text-[#666] mb-1">Duración</Text>
                <Text className="text-sm font-semibold text-primary text-center">
                  {duration}
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl mb-1">⭐</Text>
                <Text className="text-xs text-[#666] mb-1">Calificación</Text>
                <Text className="text-sm font-semibold text-secondary text-center">
                  {rating}
                </Text>
              </View>
              <View className="items-center flex-1">
                <Text className="text-2xl mb-1">💰</Text>
                <Text className="text-xs text-[#666] mb-1">Precio</Text>
                <Text className="text-sm font-semibold text-secondary text-center">
                  {formatCurrency(price)}
                </Text>
              </View>
            </View>
          </View>

          {/* Descripción */}
          <View className="px-5 mb-5">
            <Text className="text-lg font-bold text-primary mb-3">
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
                <Text className="text-lg font-bold text-primary">Galería</Text>
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="px-5"
              >
                {galleryImages.map((uri, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => openGalleryModal(index)}
                    activeOpacity={0.8}
                  >
                    <Image
                      source={{ uri }}
                      className="w-[280px] h-[200px] rounded-2xl mr-3"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Sección del Creador */}
          <View className="px-5 mb-6">
            <Text className="text-lg font-bold text-primary mb-4">
              Organizador del Evento
            </Text>
            <View className="bg-white rounded-2xl p-4 shadow flex-row items-start">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60",
                }}
                className="w-14 h-14 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-base font-semibold text-primary">
                  Juan García
                </Text>
                <Text className="text-xs text-[#999] mt-1">
                  Guía de ecoturismo certificado
                </Text>
                <Text className="text-sm text-[#666] mt-2 leading-5">
                  Especialista en rutas sostenibles con 10 años de experiencia.
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    (navigation as any).navigate("CreatorProfile", {
                      name: "Juan García",
                      avatar:
                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60",
                    })
                  }
                  className="mt-3 bg-secondary rounded-lg py-2 px-4 self-start"
                >
                  <Text className="text-white text-sm font-semibold">
                    Ver más sobre el organizador
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Sección de Calendario y Agendar */}
          <View className="px-5 mb-6">
            <Text className="text-lg font-bold text-primary mb-4">
              Fecha del Evento
            </Text>
            <View className="bg-white rounded-2xl p-4 shadow">
              <Calendar
                current="2025-10-01"
                onDayPress={(day: any) => {
                  if (availableDates.includes(day.dateString)) {
                    setSelectedDate(day.dateString);
                  }
                }}
                markedDates={{
                  ...getMarkedDates(),
                  ...getDisabledDates(),
                }}
                disableAllTouchEventsForDisabledDays={true}
                theme={{
                  backgroundColor: "#FFFFFF",
                  calendarBackground: "#FFFFFF",
                  textSectionTitleColor: "#344F1F",
                  selectedDayBackgroundColor: "#344F1F",
                  selectedDayTextColor: "#FFFFFF",
                  todayTextColor: "#F4991A",
                  todayBackgroundColor: "transparent",
                  dayTextColor: "#333",
                  textDisabledColor: "#C0C0C0",
                  dotColor: "#F4991A",
                  selectedDotColor: "#FFFFFF",
                  monthTextColor: "#344F1F",
                  indicatorColor: "#F4991A",
                  arrowColor: "#F4991A",
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 14,
                  textMonthFontWeight: "bold",
                }}
              />
              <Text className="text-sm text-[#666] text-center mt-4">
                Fechas disponibles: {availableDates.length} opciones
              </Text>
              <Text className="text-xs text-[#999] text-center mt-1">
                Solo puedes seleccionar las fechas marcadas
              </Text>
            </View>
          </View>

          {/* Botón de Agendar */}
          <View className="px-5 mb-6">
            <TouchableOpacity
              onPress={() =>
                (navigation as any).navigate("Payment", {
                  eventTitle: title,
                  eventDate: selectedDate,
                  price: price,
                })
              }
              className="bg-secondary rounded-xl py-4 shadow-lg"
            >
              <View className="flex-row items-center justify-center">
                <Ionicons name="calendar" size={20} color="white" />
                <Text className="text-white text-center text-lg font-bold ml-2">
                  Agendar Evento - {formatCurrency(price)}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Reseñas */}
          <View className="px-5 mb-8">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-lg font-bold text-primary">
                Reseñas ({reviews.length})
              </Text>
              <View className="flex-row items-center">
                <Text className="text-secondary text-lg mr-1">⭐</Text>
                <Text className="text-base font-semibold text-primary">
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
                      <Text className="font-semibold text-base text-primary">
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

      {/* Gallery Modal */}
      <ImageGalleryModal
        visible={showGalleryModal}
        onClose={() => {
          console.log("Cerrando modal de galería");
          setShowGalleryModal(false);
        }}
        images={galleryImages}
        initialIndex={selectedImageIndex}
      />
    </View>
  );
}
