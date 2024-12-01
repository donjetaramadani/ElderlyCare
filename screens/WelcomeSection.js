import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WelcomeSection = ({ userName }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {userName}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAFAFA",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212121",
  },
});

export default WelcomeSection;
