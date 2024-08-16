import React, { useState } from "react";
import { View, FlatList, StyleSheet, Text, Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import storage from "../storage/storage";
import MovieCard from "../components/MovieCard";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import SearchBar from "../components/SearchBar";

const fetchBookmarks = async () => {
  try {
    const bookmarks = await storage.load({ key: "bookmarks" });
    return bookmarks || [];
  } catch (error) {
    if (error.name === "NotFoundError") {
      return [];
    }
    console.error("Error fetching bookmarks:", error);
    return [];
  }
};

const Bookmark = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const {
    data: bookmarkedMovies = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredMovies = bookmarkedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderMovie = ({ item }) => (
    <MovieCard
      key={item.id}
      title={item.title}
      imageSource={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
      rating={item.vote_average.toFixed(2)}
      onPress={() => navigation.navigate("MovieDetails", { movie: item })}
    />
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading bookmarks.</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Bookmarks</Text>
        <View style={styles.search}>
          <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
        </View>
      </View>
      {filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
        />
      ) : (
        <View>
          <Text style={styles.emptyText}>
            {searchQuery ? "Not in your bookmarks" : "You have no bookmarks yet"}
          </Text>
          <Image
            source={require("../assets/emptyBookmark.png")}
            style={styles.emptyBookmark}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorPrimary,
    padding: 10,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: colors.colorSecondary,
    height: 250,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerText: {
    color: colors.colorText,
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 2,
    textAlignVertical: "center",
    marginTop: 70,
    marginBottom: 10,
  },
  cardRow: {
    justifyContent: "space-between",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: "gray",
    fontSize: 25,
    marginBottom: 0,
  },
  emptyBookmark: {
    width: "80%",
    height: "60%",
    resizeMode: "contain",
    marginLeft: 40,
  },
});

export default Bookmark;
