import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HealthScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Health Metrics</Text>
      <Text style={styles.text}>- Heart Rate: 72 bpm</Text>
      <Text style={styles.text}>- Steps Today: 5,000</Text>
      <Text style={styles.text}>- Calories: </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});
