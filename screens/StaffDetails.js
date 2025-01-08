import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { KeyboardAvoidingView, Platform } from 'react-native';
import SpecificGeneralHospitals from "./SpecificGeneralHospitals";
import HospitalDetails from "./HospitalDetails";
import Icon from "react-native-vector-icons/MaterialIcons"; 

import profile1Picture from "../assets/images/emily-smith.jpg";
import profile2Picture from "../assets/images/john-doe.jpg";
import profile3Picture from "../assets/images/Sarah-Johnson.jpg";
import profile4Picture from "../assets/images/Michael-Lee.jpg";

const StaffDetails = ({ route, navigation }) => {
  const { staffId, hospital} = route.params || {}; // Receive staff ID
  const { hospitalId } = route.params;
  const [staffDetails, setStaffDetails] = useState(null);
  const [staff, setStaff] = useState(null);
  const [reviews, setReviews] = useState([]); // Separate reviews state
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  
  console.log("StaffDetails - Staff ID:", staffId);
  console.log("StaffDetails - Hospital:", hospital);

  const imageMap = {
    profile1Picture: profile1Picture,
    profile2Picture: profile2Picture,
    profile3Picture: profile3Picture,
    profile4Picture: profile4Picture,
  };
  
  const fetchStaffDetails = async () => {
    try {
      const response = await fetch(`http://192.168.0.42:5196/api/StaffMember/${staffId}`);
      if (response.ok) {
        const data = await response.json();
        setStaffDetails(data);
      } else {
        Alert.alert("Error", `Failed to fetch staff details: ${response.status}`);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching staff details.");
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://192.168.0.42:5196/api/StaffReview/${staffId}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched reviews:", data); // Log API response
        setReviews(data);
      } else {
        Alert.alert("Error", `Failed to fetch reviews: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      Alert.alert("Error", "An error occurred while fetching reviews.");
    }
  };
  

  useEffect(() => {
    fetchStaffDetails();
    fetchReviews();
  }, [staffId]);

  const handleRating = (starRating) => setRating(starRating);

  const handleCommentChange = (text) => setComment(text);

  const handleSubmitReview = async () => {
    if (!comment || rating === 0) {
      Alert.alert("Error", "Please provide a comment and rating.");
      return;
    }
    const newReview = { author: "User", text: comment, rating, staffId };
    try {
      const response = await fetch("http://192.168.0.42:5196/api/StaffReview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        Alert.alert("Success", "Review submitted successfully.");
        setComment("");
        setRating(0);
        fetchReviews(); // Refresh reviews
      } else {
        Alert.alert("Error", "Failed to submit review.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while submitting the review.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (!staffDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Staff details not available.</Text>
      </View>
    );
  }

  const handleDeleteReview = async (id) => {
    console.log("Attempting to delete review with ID:", id);
    if (!id) {
      Alert.alert("Error", "Review ID is invalid.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.0.42:5196/api/StaffReview/${id}`,
        { method: "DELETE" }
      );
  
      if (response.ok) {
        Alert.alert("Success", "Review deleted successfully!");
        fetchReviews(); // Refresh reviews
      } else {
        const errorDetails = await response.text();
        throw new Error(errorDetails || "Failed to delete the review.");
      }
    } catch (error) {
      console.error("Delete review error:", error.message);
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  
  console.log(staffDetails);


  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <ScrollView contentContainerStyle={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => {
            navigation.navigate("HospitalDetails", { hospital: route.params.hospital });
          }}
        >
            <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>






      {/* Profile Picture */}
      {staffDetails && (
    <>
      <Image
        source={
          imageMap[staffDetails.image]
            ? imageMap[staffDetails.image]
            : require("../assets/images/emily-smith.jpg")
        }
        style={styles.profileImage}
      />
    </>
  )}


      {/* Staff Information */}
      <Text style={styles.name}>{staffDetails.name}</Text>
      <Text style={styles.position}>{staffDetails.position}</Text>
      <Text style={styles.bio}>{staffDetails.history || "No bio available"}</Text>

      {/* Contact Information */}
      <View style={styles.contactContainer}>
        <Text style={styles.contactLabel}>Phone:</Text>
        <Text style={styles.contact}>{staffDetails.phone}</Text>
      </View>
      <View style={styles.contactContainer}>
        <Text style={styles.contactLabel}>Email:</Text>
        <Text style={styles.contact}>{staffDetails.email}</Text>
      </View>

      {/* Reviews */}
      <View style={styles.reviewsContainer}>
        <Text style={styles.reviewsTitle}>Staff Reviews</Text>
        <FlatList
          data={reviews}
          keyExtractor={(item, index) => (item?.id ? item.id.toString() : `key-${index}`)}
          renderItem={({ item }) => {
            return (
              <View style={styles.reviewCard}>
                <Text style={styles.reviewAuthor}>{item?.author || "Anonymous"}</Text>
                <Text style={styles.reviewText}>{item?.text || "No comment"}</Text>
                <Text style={styles.reviewRating}>
                  Rating: {item?.rating || "N/A"}/5
                </Text>
                {item?.id && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeleteReview(item.id)}
                  >
                    <Text style={styles.deleteButtonText}>Delete Review</Text>
                  </TouchableOpacity>
            
          
                )}
              </View>
            );
          }}
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 24,
    backgroundColor: "#f9f9f9", 
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 24,
    borderWidth: 4,
    borderColor: "#fff", 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  name: {
    fontSize: 32,
    fontWeight: "600",
    color: "#2c3e50", 
    marginBottom: 8,
    textAlign: "center", 
  },
  position: {
    fontSize: 20,
    color: "#7f8c8d", 
    fontStyle: "italic",
    marginBottom: 20,
    textAlign: "center",
  },
  bio: {
    fontSize: 16,
    textAlign: "center",
    color: "#34495e",
    marginBottom: 28,
    lineHeight: 22,
    paddingHorizontal: 20, 
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
    fontWeight: "500", 
  },
  contact: {
    fontSize: 18,
    color: "#2980b9",
    fontWeight: "400", 
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
  deleteButton: {
    backgroundColor: '#e74c3c', 
    paddingVertical: 10,  
    paddingHorizontal: 20, 
    borderRadius: 20,  
    marginTop: 10, 
    alignSelf: 'flex-start', 
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, 
  },

  deleteButtonText: {
    color: '#fff', 
    fontSize: 16,  
    fontWeight: 'bold', 
    textAlign: 'center',  
  },
  goBackButton: {
    width: 35,
    height: 35, 
    borderRadius: 25, 
    backgroundColor: "#2471a3",
    justifyContent: "center", 
    alignItems: "center", 
    shadowColor: "#34495e", 
    shadowOffset: { width: 0, height: 6 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 8, 
    elevation: 6, 
    marginTop: -10, 
    marginLeft: -320, 
  },
});

export default StaffDetails;
