import React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../constants/colors";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const MovieSlider = ({ movies }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.image}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.rating}>
          Rating: {item.vote_average.toFixed(1)}
          <FontAwesome name="star" size={16} color="#FFD700" />
        </Text>

        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.description}>
          {item.overview}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("MovieDetails", { movie: item })}
          style={styles.readMoreButton}
        >
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={movies}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    margin: 10,
    padding: 10,
    width: width * 0.9,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 20,
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.colorText,
  },
  rating: {
    fontSize: 16,
    color: colors.colorText,
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: colors.colorText,
  },
  noMoviesText: {
    fontSize: 18,
    color: "gray",
  },
  readMoreButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  readMoreText: {
    fontSize: 14,
    color: colors.colorSecondary,
    fontWeight: "bold",
  },

});

export default MovieSlider;
