import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  Image,
} from "react-native";
import colors from "../constants/colors";

const CustomButton = ({ title, handlePress }) => {
  const [scale] = useState(new Animated.Value(1));

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      activeOpacity={0.7}
      style={styles.buttonWrapper}
    >
      <Animated.View style={[styles.button, { transform: [{ scale }] }]}>
        <Text style={styles.buttonText}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    margin: 10,
    borderRadius: 100,
    width: "80%",
    height: 60,
  },
  button: {
    backgroundColor: colors.colorTertiary,
    borderRadius: 100,
    shadowColor: colors.colorSecondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    paddingVertical: 7,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.colorSecondary,
  },
  buttonText: {
    color: colors.colorSecondary,
    fontSize: 23,
    fontWeight: "bold",
    fontFamily: "System",
  },
});

export default CustomButton;
