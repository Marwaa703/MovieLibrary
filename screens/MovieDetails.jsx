import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../constants/colors";
import AddToBookmark from '../components/AddToBookmark';
const { width } = Dimensions.get("window");

const MovieDetails = ({ route, navigation }) => {
  const { movie } = route.params || {};

  if (!movie) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Movie details are not available.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.goBackText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const {
    poster_path,
    title = "Title not available",
    vote_average = "N/A",
    release_date = "N/A",
    original_language = "N/A",
    overview = "No synopsis available.",
  } = movie;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
     
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster_path}` }}
          style={styles.image}
        />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
      
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{vote_average.toFixed(1)}</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Release Day</Text>
            <Text style={styles.infoText}>{release_date}</Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Language</Text>
            <Text style={styles.infoText}>
              {original_language.toUpperCase()}
            </Text>
          </View>
          <AddToBookmark movie={movie} />
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{overview}</Text>
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorPrimary,
  },
  imageContainer: {
    width: "100%",
    height: width * 1.5,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
  detailsContainer: {
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.colorText,
    flex: 1,
    marginRight: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginLeft: 5,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 14,
    color: colors.colorSecondary,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.colorText,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.colorSecondary,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: colors.colorText,
    lineHeight: 24,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 18,
    color: colors.primary,
    marginBottom: 10,
  },
  goBackText: {
    fontSize: 16,
    color: colors.secondary,
  },
});
