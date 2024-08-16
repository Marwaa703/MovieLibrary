import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import storage from "../storage/storage";

const fetchBookmarks = async () => {
  try {
    const bookmarks = await storage.load({ key: "bookmarks" });
    return bookmarks;
  } catch (error) {
    return [];
  }
};

const saveBookmarks = async (bookmarks) => {
  await storage.save({ key: "bookmarks", data: bookmarks });
};

export const useBookmarks = () => {
  const queryClient = useQueryClient();

  const {
    data: bookmarks,
    isLoading,
    error,
  } = useQuery(["bookmarks"], fetchBookmarks);

  const mutation = useMutation(saveBookmarks, {
    onSuccess: () => {
      queryClient.invalidateQueries(["bookmarks"]);
    },
  });

  const updateBookmarks = (newBookmarks) => {
    mutation.mutate(newBookmarks);
  };

  return {
    bookmarks,
    isLoading,
    error,
    updateBookmarks,
  };
};
