import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const activities = [
  { icon: "alert", text: "Take medication at 10:00 AM." },
  { icon: "walk", text: "Walked 3,200 steps today!" },
  { icon: "account", text: "Profile updated successfully." },
];

const ActivityFeed = () => {
  const renderActivity = ({ item }) => (
    <View style={styles.activityCard}>
      <MaterialCommunityIcons name={item.icon} size={24} color="#0288D1" />
      <Text style={styles.activityText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={activities}
        renderItem={renderActivity}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  activityText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#212121",
  },
});

export default ActivityFeed;
