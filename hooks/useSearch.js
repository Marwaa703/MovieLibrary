import { useQuery } from "@tanstack/react-query";

const API_KEY = API_KEY;

const searchMovie = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }
  const data = await response.json();
  return data.results;
};

const useSearch = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: () => searchMovie(),
  });
};

export default useSearch;
