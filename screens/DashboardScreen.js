import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import WelcomeSection from "./WelcomeSection";
import HealthMetricsPanel from "./HealthMetricsPanel";
import ActivityFeed from "./ActivityFeed";

const DashboardScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <WelcomeSection userName="John" />
      <HealthMetricsPanel />
      <ActivityFeed />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
});

export default DashboardScreen;
