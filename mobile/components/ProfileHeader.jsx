import { View, Text } from "react-native";
import { useAuthStore } from "../store/authStore.js";
import { Image } from "expo-image";
import styles from "../assets/styles/profile.styles.js";
import { formatMemberSince } from "../lib/utils.js";

export default function ProfileHeader() {
  const { user } = useAuthStore();

  if (!user) {
    return null; // ou un spinner/texte de chargement si vous préférez
  }

  return (
    <View style={styles.profileHeader}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />

      <View style={styles.profileInfo}>
        <Text style={styles.username}>{user.username}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.memberSince}>📝 Joined {formatMemberSince(user.createdAt)}</Text>
      </View>
    </View>
  );
}
