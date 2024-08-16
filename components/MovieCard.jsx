import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AddToBookmark from "./AddToBookmark";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../constants/colors";

const MovieCard = ({ title, imageSource, rating, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageSource }} style={styles.image} />
        <View style={styles.categoryContainer}></View>
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{rating}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            {/* <AddToBookmark movie={movie} /> */}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "45%",
    margin: "2.5%",
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    height: 250,
  },

  categoryText: {
    color: "#FFF",
    fontSize: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  title: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 1,
    color:colors.colorText,
  },
  rating: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginLeft: 5,
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    padding: 8,
    borderRadius: 50,
  },
});

export default MovieCard;
