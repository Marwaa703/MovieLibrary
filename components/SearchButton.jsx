import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SearchButton = () => {
  const navigation = useNavigation();
  const fullText = "Have something in mind ?";
  const [displayText, setDisplayText] = useState("");
  const [imageOpacity] = useState(new Animated.Value(0));

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText((prev) => prev + fullText[index]);
        index += 1;
      } else {
        clearInterval(interval);

        Animated.timing(imageOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [imageOpacity]);

  return (
    <TouchableOpacity
      style={styles.searchIcon}
      onPress={() => navigation.navigate("SearchResults")}
    >
      <View style={styles.textContainer}>
        <Text style={styles.text}>{displayText}</Text>
      </View>
      <Animated.Image
        source={require("../assets/search.gif")}
        style={[styles.searchImg, { opacity: imageOpacity }]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchIcon: {
    width: 300,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  textContainer: {
    position: "absolute",
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 50,
  },
  searchImg: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 0,
  },
});

export default SearchButton;
