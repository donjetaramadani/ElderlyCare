// StaffCard.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const StaffCard = ({ staff, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("StaffDetails", { staffId: staff.id }) // Navigate to StaffDetails screen with staff id
      }
    >
      {/* Profile Picture */}
      <Image
        source={{ uri: staff.profilePicture }} // Replace with the appropriate profile picture source
        style={styles.profileImage}
      />
      
      {/* Staff Information */}
      <View style={styles.textContainer}>
        <Text style={styles.name}>{staff.name}</Text>
        <Text style={styles.position}>{staff.position}</Text>
        <Text style={styles.contact}>
          {staff.phone} | {staff.email}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    padding: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  textContainer: {
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  position: {
    fontSize: 14,
    color: "#666",
  },
  contact: {
    fontSize: 12,
    color: "#999",
  },
});

export default StaffCard;
