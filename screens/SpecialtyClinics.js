import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

// Importing the image
import specialtyClinicsImg from "../assets/images/photo4.avif"; 

const SpecialtyClinics = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.card}>
        <Image source={specialtyClinicsImg} style={styles.image} />
        <Text style={styles.title}>Welcome to Specialty Clinics</Text>
        {/* Description inside a card with shadow */}
        <View style={styles.descriptionCard}>
          <Text style={styles.description}>
            Specialty clinics provide specialized medical care for various health conditions, focusing on specific areas such as cardiology, orthopedics, dermatology, and more. These clinics cater to patients requiring expert care and tailored treatments for particular medical needs.
          </Text>
        </View>
        {/* Location Section */}
        <Text style={styles.locationTitle}>Location:</Text>
        <Text style={styles.location}>456 Health Ave, Cityville, Country</Text>

        {/* Button to See Departments */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SpecialtyClinics")} 
        >
          <Text style={styles.buttonText}>See Specialty Departments</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    justifyContent: "flex-start", 
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f4f4f4", 
  },
  card: {
    backgroundColor: "#fff", 
    borderRadius: 12,
    shadowColor: "#000", 
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    padding: 20,
    width: "90%",
    maxWidth: 350, 
    marginBottom: 20,
  },
  image: {
    width: "100%", 
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover", 
  },
  title: {
    fontSize: 28,
    fontWeight: "700", 
    color: "#2C3E50", 
    marginBottom: 20, 
    textAlign: "center",
    letterSpacing: 1.2,
    paddingHorizontal: 10, 
  },
  descriptionCard: {
    backgroundColor: "#fff", 
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.2, 
    shadowRadius: 15, 
    shadowOffset: { width: 0, height: 8 }, 
    padding: 15,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333", 
    lineHeight: 22, 
    textAlign: "left", 
    paddingHorizontal: 10,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333",
    marginTop: 20,
    textAlign: "center",
  },
  location: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007BFF", 
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff", 
    fontSize: 18,
    fontWeight: "600",
  },
});

export default SpecialtyClinics;
