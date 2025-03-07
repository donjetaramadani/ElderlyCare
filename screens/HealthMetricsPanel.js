import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useHealthData } from "./HealthDataContext";

const HealthMetricsPanel = () => {
    const { healthData, updateHealthData, loading, error } = useHealthData();


    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error}</Text>;
    }



  const metrics = [
    { icon: "heart-pulse", label: "Heart Rate", value: `${healthData?.heartRate || 0} bpm`, bgColor: "#E8F5E9" },
    { icon: "run", label: "Steps", value: `${healthData?.steps || 0}` , bgColor: "#FFF8E1" },
    { icon: "fire", label: "Calories", value: `${healthData?.calories || 0} kcal`, bgColor: "#E3F2FD" },
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
