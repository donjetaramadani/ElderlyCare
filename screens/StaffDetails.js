import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const StaffDetails = ({ route }) => {
  const { staff } = route.params; // Retrieve staff object from route

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{ uri: staff.profilePicture }}
        style={styles.profileImage}
      />
      
      {/* Staff Information */}
      <Text style={styles.name}>{staff.name}</Text>
      <Text style={styles.position}>{staff.position}</Text>
      <Text style={styles.bio}>{staff.bio || "No bio available"}</Text>
      
      {/* Contact Information */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactLabel}>Phone:</Text>
        <Text style={styles.contact}>{staff.phone}</Text>
      </View>
      
      <View style={styles.contactContainer}>
        <Text style={styles.contactLabel}>Email:</Text>
        <Text style={styles.contact}>{staff.email}</Text>
      </View>

      {/* Doctor Reviews */}
      {staff.reviews && staff.reviews.length > 0 && (
        <View style={styles.reviewsContainer}>
          <Text style={styles.reviewsTitle}>Patient Reviews</Text>
          {staff.reviews.map((review, index) => (
            <View key={index} style={styles.reviewCard}>
              <Text style={styles.reviewAuthor}>{review.author}</Text>
              <Text style={styles.reviewText}>{review.text}</Text>
              <Text style={styles.reviewRating}>Rating: {review.rating}/5</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f9f9f9", // Light background for a cleaner look
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 24,
    borderWidth: 4,
    borderColor: "#fff", // Border color to match the light background
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2c3e50", // Darker color for text readability
    marginBottom: 8,
    textAlign: "center", // Center the name for balance
  },
  position: {
    fontSize: 20,
    color: "#7f8c8d", // Subtle gray for the position
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    color: "#34495e", // Dark gray for readability
    marginBottom: 28,
    lineHeight: 22,
    paddingHorizontal: 20, // Padding for bio text
  },
  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 16,
  },
  contactLabel: {
    fontSize: 18,
    color: "#2c3e50",
    fontWeight: "500", // Slightly lighter weight for label text
  },
  contact: {
    fontSize: 18,
    color: "#2980b9", // Accent color for contact info
    fontWeight: "400", // Regular weight for contact details
  },
  reviewsContainer: {
    marginTop: 20,
    width: '100%',
  },
  reviewsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495e',
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  reviewRating: {
    fontSize: 14,
    color: '#f39c12',
  },
});

export default StaffDetails;
