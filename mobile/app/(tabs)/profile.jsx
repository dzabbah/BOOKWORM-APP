import { useState, useEffect } from "react";
import { View, Alert, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api.js";
import { useAuthStore } from "../../store/authStore.js";
import styles from "../../assets/styles/profile.styles.js";
import ProfileHeader from "../../components/ProfileHeader.jsx";
import LogoutButton from "../../components/LogoutButton.jsx";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
//import COLORS from "../constants/colors.js";

export default function Profile() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setrefreshing] = useState(false);

    const { token } = useAuthStore();

    const router = useRouter();

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`${API_URL}/books/user`, {
            headers: {Authorization: `Bearer ${token}`},
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Failed to fetch user books");

        setBooks(data);
    }   catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Failed to load profile data. Pull down to refresh.");
   }    finally {
        setIsLoading(false);
   }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderBookItem = ({item}) => (
    <View style={styles.bookItem}>
        <Image source={item.image} style={styles.bookImage} />
        <View style={styles.bookInfo}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <View style={styles.ratingContainer}>{renderRatingStars(item.rating)}</View>
            <Text style={styles.bookCaption} numberOfLines={2}>
                {item.caption}
            </Text>
            <Text style={styles.bookDate}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
    </View>
  );

  const renderratingStars = (rating) => {
    const stars = [];
    for (let i =1; i<= 5; i++) {
        stars.push(
            <Ionicons
                key={i}
                name={i <= rating ? "star" : "star-outline"}
                size={14}
                color={i <= rating ? "#f4b400": "#688f68"}
                style={{ marginRight: 2}}
            />
        );
    }
    return stars;
  }

    return (
        <View style={styles.container}>
            <ProfileHeader />
            <LogoutButton />

            {/* YOUR RECOMMANDATIONS */}
            <View style={styles.booksHeader}>
                <Text style={styles.booksTitle}>Your Recommandations 📚</Text>
                <Text style={styles.booksCount}>{books.length} books</Text>
            </View>

            <FlatList
              data={books}
              renderItem={renderBookItem}
              keyExtractor={(item) => item._id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.booksList}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Ionicons name="book-outline" size={50} color={"#688f68"} />
                    <Text style={styles.emptyText}>No recommendations yet</Text>
                    <TouchableOpacity style={styles.addButton} onPress={() => router.push("/create")}>
                        <Text style={styles.addButtonText}>Add Your First Book</Text>
                    </TouchableOpacity>
                </View>
              }
            />
        </View>
    );
}