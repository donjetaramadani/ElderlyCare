import React from "react";
import { View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./Navigation";
import Header from "./screens/Header";
import BottomNavBar from "./screens/BottomNavBar";

export default function App() {
  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});
