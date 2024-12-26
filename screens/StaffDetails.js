
import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, ScrollView, FlatList, TouchableOpacity} from "react-native";
import { FontAwesome } from '@expo/vector-icons';

const StaffDetails = ({ route }) => {
  const { staff } = route.params; 
  const [rating, setRating] = useState(0); 
  const [comment, setComment] = useState(""); 
  const [reviews, setReviews] = useState(staff?.reviews || []); 

  const handleRating = (starRating) => {
    setRating(starRating);
  };

  const handleCommentChange = (text) => {
    setComment(text);
  };

  const handleSubmitReview = () => {
    const newReview = { author: "User", text: comment, rating };
    setReviews([...reviews, newReview]);
    setComment("");
    setRating(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Picture */}
      <Image source={staff.image} style={styles.profileImage} />

      
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

    <View style={styles.reviewsContainer}>
            <Text style={styles.reviewsTitle}>Staff Reviews</Text>
            <FlatList
            data={reviews}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <View style={styles.reviewCard}>
                <Text style={styles.reviewAuthor}>{item.author || "Anonymous"}</Text>
                <Text style={styles.reviewText}>{item.text || "No comment"}</Text>
                <Text style={styles.reviewRating}>Rating: {item.rating || "N/A"}/5</Text>
                </View>
            )}
            />
        </View>

        {/* Rating and Comment Section */}
        <View style={styles.ratingSection}>
                <Text style={styles.ratingTitle}>Rate this Staff Member:</Text>
                <View style={styles.starRatingContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                    <FontAwesome
                        name={star <= rating ? "star" : "star-o"}
                        size={30}
                        color="#f39c12"
                    />
                    </TouchableOpacity>
                ))}
                </View>
                <TextInput
                style={styles.commentInput}
                placeholder="Write your review..."
                value={comment}
                onChangeText={handleCommentChange}
                multiline
                />
                <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
                <Text style={styles.submitButtonText}>Submit Review</Text>
                </TouchableOpacity>
            </View>

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
  ratingSection: {
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  ratingTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 10,
  },
  starRatingContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  commentInput: {
    height: 100,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "top",
    fontSize: 14,
    marginBottom: 10,
    width: "100%",
  },
  submitButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default StaffDetails;
