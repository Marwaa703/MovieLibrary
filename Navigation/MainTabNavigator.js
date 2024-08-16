import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Main from "../screens/Main";
import Bookmark from "../screens/Bookmark";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../constants/colors";

const tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Bookmark") {
            iconName = focused ? "bookmark" : "bookmark-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.colorTertiary,
        tabBarInactiveTintColor: colors.colorText,
        tabBarStyle: {
          backgroundColor: colors.colorPrimary,
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      })}
    >
      <tab.Screen
        name="Home"
        component={Main}
        options={{ headerShown: false }}
      />
      <tab.Screen
        name="Bookmark"
        component={Bookmark}
        options={{ headerShown: false }}
      />
    </tab.Navigator>
  );
};

export default MainTabNavigator;
