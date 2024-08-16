import React, { useState } from "react";
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import colors from "../constants/colors";
import SearchBar from "../components/SearchBar";
import useSearch from "../hooks/useSearch";
import MovieCard from "../components/MovieCard";
import { useNavigation } from "@react-navigation/native";

const SearchResults = () => {
  const navigation = useNavigation();
  const { data: movies = [], error, loading } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredMovies = movies.filter((movie) =>
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>What are you Looking For..</Text>
        <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      </View>
      {searchQuery && filteredMovies.length > 0 ? (
        <FlatList
          data={filteredMovies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.cardRow}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View>
          <Text style={styles.emptyText}>
            {searchQuery ? "No movies found." : "Search for movies here."}
          </Text>
          <Image
            source={require("../assets/search.png")}
            style={styles.search}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  listContent: {
    paddingVertical: 10,
  },
  emptyText: {
    color: colors.colorText,
    fontSize: 18,
    textAlign: "center",
    marginTop: 80,
  },
  search: {
    width: "80%",
    height: "60%",
    resizeMode: "contain",
    marginLeft: 40,
  },
});

export default SearchResults;
