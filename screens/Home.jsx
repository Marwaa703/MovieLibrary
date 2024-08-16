import React from "react";
import { StyleSheet, View, Text } from "react-native";
import CircleLayout from "../components/CircleLayout";
import colors from "../constants/colors";
import posters from "../constants/posters";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <CircleLayout
        imageArray={posters.firstPosters}
        radius={250}
        imageSize={150}
        rotationDuration={25000}
      />
      <Text style={styles.text}>Welcome Back</Text>
      <CustomButton
        title="Movies Home"
        handlePress={() => navigate("MainTabs")}

      />
      <CircleLayout
        imageArray={posters.secondPosters}
        radius={250}
        imageSize={150}
        rotationDuration={25000}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.colorPrimary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.colorText,
    fontSize: 20,
    marginTop: 20,
    fontWeight: "bold",
  },
});
