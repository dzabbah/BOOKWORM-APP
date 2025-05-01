import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import { useAuthStore } from "../../store/authStore.js";
import { useEffect, useState } from 'react';

import styles from "../../assets/styles/home.styles.js";
import { API_URL } from "../../constants/api.js";

export default function Home() {
    const { token } = useAuthStore();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchBooks = async (pageNum = 1, refresh = false) => {
        try {
          if(refresh) setRefreshing(true);
          else if(pageNum === 1) setLoading(true);
          
          const response = await fetch (`${API_URL}/books?page=${pageNum}&limit=5`, {
            headers: { Authorization: `${token}` },
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.message || "Failed to fetch books");

          setBooks((prevBooks) => [...prevBooks, ...data.books]);

          setHasMore(pageNum < data.totalPages);
          setPage(pageNum);
        } catch (error) {
          console.log("Error fetching books", error);
        } finally {
            if (refresh) setRefreshing(false);
            else setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleLoadMore = async () => {};

    const renderItem = ({ item }) => (
        <View style={styles.bookCard}>
            <View style={styles.bookHeader}>
                <View style={styles.userInfo}>
                    <Image source={{uri: item.user.profileImage }} style={styles.avatar} />
                    <Text style={styles.username}>{item.username}</Text>
                </View>
            </View>

            <View style={styles.bookImageContainer}>
                <Image source={item.image} style={styles.bookImage} contentFit="cover" />
            </View>
        </View>
    );

    console.log(books);

    return (
        <View style={styles.container}>
            <FlatList 
               data={books}
               renderItem={renderItem}
               keyExtractor={(item) => item._id}
               contentContainerStyle={styles.listContainer}
               showsVerticalScrollIndicator={false}
            
            />
            

            
        </View>
    );
}