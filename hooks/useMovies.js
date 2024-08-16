import { useQuery } from "@tanstack/react-query";

const API_KEY = API_KEY;
const BASE_URL = BASE_URL;

const fetchMovies = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(
      `Error fetching ${endpoint} movies: ${response.statusText}`
    );
  }
  const data = await response.json();
  return data.results;
};

const useMovies = (endpoint) => {
  return useQuery({
    queryKey: ["movies", endpoint],
    queryFn: () => fetchMovies(endpoint),
  });
};

export default useMovies;
