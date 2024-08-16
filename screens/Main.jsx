import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import colors from "../constants/colors";
import MovieCard from "../components/MovieCard";
import MovieSlider from "../components/MovieSlider";
import useMovies from "../hooks/useMovies";
import { useNavigation } from "@react-navigation/native";
import SearchButton from "../components/SearchButton";

const Main = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Top Movies");

  const getEndpoint = (tab) => {
    switch (tab) {
      case "Top Movies":
        return "top_rated";
      case "Upcoming Movies":
        return "upcoming";
      case "Now Playing Movies":
        return "now_playing";
      default:
        return "top_rated";
    }
  };

  const { data: movies, error, isLoading } = useMovies(getEndpoint(activeTab));
  const { data: popular, perror, pisLoading } = useMovies("popular");

  const isDataLoading = isLoading || pisLoading;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Welcome Back !</Text>
          <SearchButton />
        </View>
        <View style={styles.popularContainer}>
          <Text style={styles.popularText}>Popular</Text>
          <MovieSlider movies={popular} />
        </View>

        <View style={styles.tabsContainer}>
          {["Top Movies", "Upcoming Movies", "Now Playing Movies"].map(
            (category) => (
              <TouchableOpacity
                key={category}
                onPress={() => setActiveTab(category)}
                style={[
                  styles.tabItem,
                  activeTab === category && styles.activeTabItem,
                ]}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === category && styles.activeTabText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.cardRow}>
            {isDataLoading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.colorTertiary} />
              </View>
            ) : (
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  imageSource={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  rating={movie.vote_average.toFixed(2)}
                  onPress={() =>
                    navigation.navigate("MovieDetails", { movie: movie })
                  }
                />
              ))
            )}
          </View>
        </View>

        <StatusBar />
      </View>
    </ScrollView>
  );
};

export default Main;

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
    fontSize: 39,
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 5,
    textAlignVertical: "center",
    marginTop: 70,
    marginBottom: 10,
  },
  popularContainer: {
    marginBottom: 16,
    marginLeft: 16,
    padding: 16,
    fontSize: 16,
  },
  popularText: {
    fontSize: 16,
    color: colors.colorTertiary,
    fontWeight: "bold",
    textAlign: "center",
  },
  tabsContainer: {
    flexDirection: "row",
    marginBottom: 16,
    marginLeft: 16,
    padding: 16,
    textAlign: "center",
    fontSize: 16,
  },
  tabItem: {
    marginRight: 16,
    paddingBottom: 8,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: colors.colorTertiary,
  },
  tabText: {
    fontSize: 16,
    color: colors.colorText,
  },
  activeTabText: {
    color: colors.colorTertiary,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: 10,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 500,
    marginLeft: 500,
  },
});
