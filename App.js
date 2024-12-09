import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation";
import Header from "./screens/Header";
import BottomNavBar from "./screens/BottomNavBar";
import { HealthDataProvider } from "./screens/HealthDataContext";

export default function App() {
  return (
  <HealthDataProvider>
    <NavigationContainer>
      <View style={styles.container}>
        {/* Header */}
        <Header />
        {/* Main Navigation */}
        <View style={{ flex: 1 }}>
          <Navigation />
        </View>
        {/* Bottom Navigation */}
        <BottomNavBar />
      </View>
    </NavigationContainer>
  </HealthDataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});
