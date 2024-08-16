import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../constants/colors";

const SearchBar = ({ searchQuery, onSearch }) => {
  const handleChange = (text) => {
    onSearch(text);
  };

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        placeholderTextColor="#fff"
        value={searchQuery}
        onChangeText={handleChange}
      />
      <Ionicons
        name="search"
        size={20}
        color="white"
        style={styles.searchIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    width: "70%",
    marginStart: 25,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    paddingLeft: 10,
    height: 50,
    borderWidth: 2,
    borderColor: colors.colorText,
    borderRadius: 18,
  },
  searchIcon: {
    marginLeft: 4,
  },
});

export default SearchBar;
