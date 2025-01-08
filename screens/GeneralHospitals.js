import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons";

import generalHospitalsImg from "../assets/images/photo1.avif"; 

const GeneralHospitals = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
   
       {/* Go Back Button */}
       <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigation.navigate("HospitalTypes"); 
        }}
      >
         <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Image source={generalHospitalsImg} style={styles.image} />
        <Text style={styles.title}>Welcome to General Hospitals</Text>
        {/* Description inside a card with shadow */}
        <View style={styles.descriptionCard}>
          <Text style={styles.description}>
            General hospitals provide a variety of healthcare services, including emergency care, surgery, and outpatient treatments. They play a crucial role in offering comprehensive care for individuals with various medical needs.
          </Text>
        </View>
        

        {/* Button to See Departments */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SpecificGeneralHospitals", { type: "General" })} 
        >
          <Text style={styles.buttonText}>See Specific Hospitals</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, 
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingTop: 50,
    backgroundColor: "#f4f4f4", 
    position: "relative",
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
  goBackButton: {
    position: 'absolute',
    top: 10, 
    left: 20, 
    width: 35,
    height: 35,
    borderRadius: 20, 
    backgroundColor: "#2471a3",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#34495e",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default GeneralHospitals;
