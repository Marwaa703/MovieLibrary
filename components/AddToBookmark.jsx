import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import colors from "../constants/colors";
import storage from "../storage/storage";

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

const updateBookmarks = async (bookmarks) => {
  try {
    await storage.save({
      key: "bookmarks", 
      data: bookmarks,
    });
  } catch (error) {
    console.error("Error updating bookmarks:", error);
  }
};

const AddToBookmark = ({ movie }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const queryClient = useQueryClient();

  const { data: bookmarks = [] } = useQuery({
    queryKey: ["bookmarks"],
    queryFn: fetchBookmarks,
  });

  const mutation = useMutation({
    mutationFn: updateBookmarks,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
    },
  });

  useEffect(() => {
    setIsBookmarked(bookmarks.some((b) => b.id === movie.id));
  }, [movie.id, bookmarks]);

  const toggleBookmark = () => {
    const updatedBookmarks = isBookmarked
      ? bookmarks.filter((b) => b.id !== movie.id)
      : [...bookmarks, movie];
    mutation.mutate(updatedBookmarks);
    setIsBookmarked(!isBookmarked);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={toggleBookmark}>
      <MaterialIcons
        name={isBookmarked ? "bookmark" : "bookmark-border"}
        size={30}
        color={colors.colorTertiary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddToBookmark;
