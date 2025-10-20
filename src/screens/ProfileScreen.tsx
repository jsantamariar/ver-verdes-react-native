import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "Jorge",
    lastName: "Santamaria",
    email: "jorge@example.com",
    bio: "Aventurero y explorador de senderos ecológicos. Amante de la naturaleza.",
    profileImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60",
  });

  const [tempData, setTempData] = useState(profileData);

  const handleEditToggle = () => {
    if (isEditing) {
      // Guardar cambios
      setProfileData(tempData);
      setIsEditing(false);
      Alert.alert("Éxito", "Perfil actualizado correctamente");
    } else {
      // Modo edición
      setTempData(profileData);
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleProfileImageChange = () => {
    // Aquí se podría integrar una librería de selección de imágenes
    Alert.alert("Cambiar foto de perfil", "Selecciona una opción", [
      { text: "Cámara", onPress: () => {} },
      { text: "Galería", onPress: () => {} },
      { text: "Cancelar", style: "cancel" },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-6 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-secondary">Mi Perfil</Text>
          <TouchableOpacity
            onPress={handleEditToggle}
            className={`px-4 py-2 rounded-lg ${
              isEditing ? "bg-primary" : "bg-[#f0f0f0]"
            }`}
          >
            <Text
              className={`font-semibold ${
                isEditing ? "text-white" : "text-secondary"
              }`}
            >
              {isEditing ? "Guardar" : "Editar"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Foto de perfil */}
        <View className="items-center mb-6">
          <TouchableOpacity
            onPress={isEditing ? handleProfileImageChange : undefined}
            disabled={!isEditing}
            className="relative"
          >
            <Image
              source={{ uri: profileData.profileImage }}
              className="w-[140px] h-[140px] rounded-full"
            />
            {isEditing && (
              <View className="absolute bottom-0 right-0 bg-primary rounded-full p-3">
                <Text className="text-[20px]">📷</Text>
              </View>
            )}
          </TouchableOpacity>
          {isEditing && (
            <Text className="text-[12px] text-[#999] mt-2">
              Toca la foto para cambiar
            </Text>
          )}
        </View>

        {/* Sección de información */}
        <View className="px-5 mb-6">
          {/* Nombre */}
          <View className="mb-4">
            <Text className="text-[14px] font-semibold text-secondary mb-2">
              Nombre
            </Text>
            {isEditing ? (
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3"
                value={tempData.firstName}
                onChangeText={(text) =>
                  setTempData({ ...tempData, firstName: text })
                }
                placeholder="Ingresa tu nombre"
                placeholderTextColor="#9ca3af"
              />
            ) : (
              <View className="bg-white rounded-lg px-4 py-3">
                <Text className="text-[16px] text-[#333]">
                  {profileData.firstName}
                </Text>
              </View>
            )}
          </View>

          {/* Apellido */}
          <View className="mb-4">
            <Text className="text-[14px] font-semibold text-secondary mb-2">
              Apellido
            </Text>
            {isEditing ? (
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3"
                value={tempData.lastName}
                onChangeText={(text) =>
                  setTempData({ ...tempData, lastName: text })
                }
                placeholder="Ingresa tu apellido"
                placeholderTextColor="#9ca3af"
              />
            ) : (
              <View className="bg-white rounded-lg px-4 py-3">
                <Text className="text-[16px] text-[#333]">
                  {profileData.lastName}
                </Text>
              </View>
            )}
          </View>

          {/* Correo electrónico */}
          <View className="mb-4">
            <Text className="text-[14px] font-semibold text-secondary mb-2">
              Correo Electrónico
            </Text>
            {isEditing ? (
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3"
                value={tempData.email}
                onChangeText={(text) =>
                  setTempData({ ...tempData, email: text })
                }
                placeholder="Ingresa tu correo"
                placeholderTextColor="#9ca3af"
                keyboardType="email-address"
              />
            ) : (
              <View className="bg-white rounded-lg px-4 py-3">
                <Text className="text-[16px] text-[#333]">
                  {profileData.email}
                </Text>
              </View>
            )}
          </View>

          {/* Biografía */}
          <View className="mb-4">
            <Text className="text-[14px] font-semibold text-secondary mb-2">
              Biografía
            </Text>
            {isEditing ? (
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3"
                value={tempData.bio}
                onChangeText={(text) => setTempData({ ...tempData, bio: text })}
                placeholder="Cuéntanos sobre ti"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            ) : (
              <View className="bg-white rounded-lg px-4 py-3">
                <Text className="text-[16px] text-[#333] leading-5">
                  {profileData.bio}
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Botones de acción */}
        {isEditing && (
          <View className="px-5 flex-row gap-3">
            <TouchableOpacity
              onPress={handleCancel}
              className="flex-1 bg-[#f0f0f0] rounded-lg py-3 items-center"
            >
              <Text className="text-secondary font-semibold">Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleEditToggle}
              className="flex-1 bg-primary rounded-lg py-3 items-center"
            >
              <Text className="text-white font-semibold">Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sección adicional - Opciones */}
        <View className="px-5 mt-8 border-t border-[#e0e0dc] pt-6">
          <Text className="text-[14px] font-semibold text-secondary mb-3">
            Más opciones
          </Text>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-[#f0f0f0]">
            <Text className="text-[16px] text-[#333]">Notificaciones</Text>
            <Text className="text-[18px]">🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-[#f0f0f0]">
            <Text className="text-[16px] text-[#333]">Ayuda</Text>
            <Text className="text-[18px]">❓</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-between py-3">
            <Text className="text-[16px] text-red-500">Cerrar sesión</Text>
            <Text className="text-[18px]">🚪</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
