
import React, { useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  Animated,
} from "react-native";

const CircleLayout = ({
  imageArray = [],
  radius = 160,
  imageSize = 120,
  rotationDuration = 30000,
}) => {
  const rotateAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    const rotate = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: rotationDuration, 
        useNativeDriver: true,
      })
    );

    rotate.start();

    return () => rotate.stop();
  }, [rotateAnim, rotationDuration]);


  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  if (!Array.isArray(imageArray) || imageArray.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No images available</Text>
      </View>
    );
  }

  const angleStep = (2 * Math.PI) / imageArray.length; 
  const center = {
    x: Dimensions.get("window").width / 2,
    y: Dimensions.get("window").height / 2,
  }; 

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ rotate }],
          },
        ]}
      >
        {imageArray.map((url, index) => {
          const angle = angleStep * index;
          const x = center.x + radius * Math.cos(angle) - imageSize / 2;
          const y = center.y + radius * Math.sin(angle) - imageSize / 2;

          return (
            <View
              key={index}
              style={[
                styles.item,
                {
                  left: x,
                  top: y,
                  width: imageSize,
                  height: imageSize,
                  borderRadius: imageSize / 2,
                },
              ]}
            >
              <Image source={{ uri: url }} style={styles.image} />
            </View>
          );
        })}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  animatedContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  item: {
    position: "absolute",
    overflow: "hidden", 
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", 
  },
});

export default CircleLayout;
