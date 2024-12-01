import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HealthMetricsPanel = () => {
  const metrics = [
    { icon: "heart-pulse", label: "Heart Rate", value: "72 bpm", bgColor: "#E8F5E9" },
    { icon: "run", label: "Steps", value: "5,432", bgColor: "#FFF8E1" },
    { icon: "sleep", label: "Sleep", value: "7h 45m", bgColor: "#E3F2FD" },
  ];

  return (
    <View style={styles.container}>
      {metrics.map((metric, index) => (
        <View key={index} style={[styles.metricCard, { backgroundColor: metric.bgColor }]}>
          <MaterialCommunityIcons name={metric.icon} size={30} color="#0288D1" />
          <Text style={styles.metricLabel}>{metric.label}</Text>
          <Text style={styles.metricValue}>{metric.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 10,
    
    
  },
  metricCard: {
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: "30%",
   
  },
  metricLabel: {
    fontSize: 14,
    color: "#212121",
    marginTop: 5,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#212121",
    marginTop: 5,
  },
});

export default HealthMetricsPanel;
