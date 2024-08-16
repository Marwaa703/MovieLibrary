import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./Navigation/root";
import queryClient from "./hooks/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

const App = () => {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Root />
      </QueryClientProvider>
    </NavigationContainer>
  );
};

export default App;
