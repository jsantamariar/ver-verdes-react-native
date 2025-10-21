import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

interface ImageGalleryModalProps {
  visible: boolean;
  onClose: () => void;
  images: string[];
  initialIndex?: number;
}

const { width, height } = Dimensions.get("window");

const ImageGalleryModal: React.FC<ImageGalleryModalProps> = ({
  visible,
  onClose,
  images,
  initialIndex = 0,
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <SafeAreaView className="flex-1 bg-black">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-black/90 z-50">
          <TouchableOpacity
            onPress={() => {
              console.log("Botón de cerrar presionado");
              onClose();
            }}
            className="bg-white/30 rounded-full p-3 shadow-lg z-50"
            activeOpacity={0.7}
            style={{ zIndex: 9999 }}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text className="text-white text-lg font-semibold">
              {currentIndex + 1} de {images.length}
            </Text>
            <Text className="text-white/70 text-xs mt-1">Toca para cerrar</Text>
          </View>
          <View className="w-12" />
        </View>

        {/* Image Container */}
        <View className="flex-1 relative">
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / width
              );
              setCurrentIndex(index);
            }}
            contentOffset={{ x: currentIndex * width, y: 0 }}
          >
            {images.map((imageUri, index) => (
              <View key={index} style={{ width, height: height - 120 }}>
                <Image
                  source={{ uri: imageUri }}
                  className="w-full h-full"
                  resizeMode="contain"
                />
              </View>
            ))}
          </ScrollView>

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <TouchableOpacity
              onPress={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3"
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-back" size={24} color="white" />
            </TouchableOpacity>
          )}

          {currentIndex < images.length - 1 && (
            <TouchableOpacity
              onPress={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-3"
              activeOpacity={0.8}
            >
              <Ionicons name="chevron-forward" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        {/* Dots Indicator */}
        {images.length > 1 && (
          <View className="flex-row justify-center items-center py-4 bg-black/80">
            {images.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full mx-1 ${
                  index === currentIndex ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};

export default ImageGalleryModal;
