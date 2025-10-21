import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Notification {
  id: string;
  type: "event" | "message" | "follow" | "reminder";
  title: string;
  description: string;
  avatar?: string;
  timestamp: string;
  read: boolean;
}

interface NotificationsSlideProps {
  isVisible: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "reminder",
    title: "Recordatorio: Evento próximo",
    description: "Tu evento 'Senderismo Parque Arví' comienza en 2 horas",
    timestamp: "Hace 5 minutos",
    read: false,
  },
  {
    id: "2",
    type: "message",
    title: "Nuevo mensaje de Juan García",
    description: "¿A qué hora es el evento de senderismo?",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=60",
    timestamp: "Hace 10 minutos",
    read: false,
  },
  {
    id: "3",
    type: "follow",
    title: "María López te ha seguido",
    description: "María López ahora sigue tu perfil",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=60",
    timestamp: "Hace 30 minutos",
    read: false,
  },
  {
    id: "4",
    type: "event",
    title: "Nuevo evento disponible",
    description: "Tour gastronómico de Medellín - Solo te faltan 2 lugares",
    timestamp: "Hace 1 hora",
    read: true,
  },
];

const getNotificationColor = (type: string): string => {
  switch (type) {
    case "reminder":
      return "#F4991A";
    case "message":
      return "#344F1F";
    case "follow":
      return "#FF6B6B";
    case "event":
      return "#65AA68";
    default:
      return "#344F1F";
  }
};

const getNotificationIcon = (type: string): string => {
  switch (type) {
    case "reminder":
      return "alarm";
    case "message":
      return "chatbubble";
    case "follow":
      return "heart";
    case "event":
      return "calendar";
    default:
      return "notifications";
  }
};

export default function NotificationsSlide({
  isVisible,
  onClose,
}: NotificationsSlideProps) {
  const { height } = useWindowDimensions();
  const [notifications, setNotifications] = useState(mockNotifications);
  const slideAnim = React.useRef(new Animated.Value(-300)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <TouchableOpacity
        className="absolute inset-0 bg-black/30 z-40"
        onPress={onClose}
        style={{ height }}
      />

      {/* Slide Container */}
      <Animated.View
        className="absolute top-0 left-0 right-0 bg-white rounded-b-3xl shadow-lg z-50"
        style={{
          transform: [{ translateY: slideAnim }],
          maxHeight: height * 0.7,
        }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-4 pb-3 border-b border-gray-200">
          <Text className="text-xl font-bold text-primary">Notificaciones</Text>
          <TouchableOpacity onPress={onClose} className="p-2">
            <Ionicons name="close" size={24} color="#344F1F" />
          </TouchableOpacity>
        </View>

        {/* Notifications List */}
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <View
                key={notification.id}
                className={`mx-3 my-2 rounded-2xl p-4 flex-row items-start gap-3 ${
                  notification.read ? "bg-gray-50" : "bg-blue-50"
                }`}
              >
                {/* Icon or Avatar */}
                {notification.avatar ? (
                  <Image
                    source={{ uri: notification.avatar }}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{
                      backgroundColor: getNotificationColor(notification.type),
                    }}
                  >
                    <Ionicons
                      name={getNotificationIcon(notification.type) as any}
                      size={18}
                      color="white"
                    />
                  </View>
                )}

                {/* Content */}
                <View className="flex-1">
                  <Text className="font-semibold text-primary text-sm">
                    {notification.title}
                  </Text>
                  <Text className="text-xs text-[#666] mt-1">
                    {notification.description}
                  </Text>
                  <Text className="text-xs text-[#999] mt-1">
                    {notification.timestamp}
                  </Text>
                </View>

                {/* Actions */}
                <View className="flex-row gap-1">
                  {!notification.read && (
                    <TouchableOpacity
                      onPress={() => handleMarkAsRead(notification.id)}
                      className="p-2"
                    >
                      <Ionicons name="checkmark" size={16} color="#344F1F" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    onPress={() => handleDeleteNotification(notification.id)}
                    className="p-2"
                  >
                    <Ionicons name="trash" size={16} color="#999" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View className="items-center justify-center py-10">
              <Ionicons name="notifications-off" size={48} color="#9ca3af" />
              <Text className="text-base text-[#666] mt-3">
                No hay notificaciones
              </Text>
            </View>
          )}
        </ScrollView>
      </Animated.View>
    </>
  );
}
