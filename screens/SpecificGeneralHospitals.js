import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import StaffCard from './StaffCard'; 
import ReviewSection from "./ReviewSection";

import hospital1Img from "../assets/images/CityGeneralHospital.jpg";
import hospital2Img from "../assets/images/MetroHealthCenter.jpg";
import hospital3Img from "../assets/images/PinewoodMedicalFacility.jpg";
import hospital4Img from "../assets/images/LakesideRegionalHospital.jpg";
import hospital5Img from "../assets/images/BrightHorizonsClinic.jpg";
import hospital6Img from "../assets/images/EvergreenHealthHub.webp";

const SpecificGeneralHospitals = ({ navigation, route }) => {
  const { type } = route.params; 

  const [searchQuery, setSearchQuery] = useState("");

  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      description:
        "City General Hospital offers advanced emergency services, outpatient care, and a state-of-the-art surgical unit to serve the community.",
      location: "456 Wellness Blvd, Cityville",
      image: hospital1Img,
      contactInfo: {
        phone: "123-456-7890",
        email: "info@citygeneral.com",
        website: "www.citygeneral.com",
      },
      servicesOffered: ["Emergency Care", "Outpatient Services", "Surgery"],
      visitingHours: {
        weekdays: "9:00 AM - 6:00 PM",
        weekends: "10:00 AM - 4:00 PM",
      },
      facilities: [
        { name: "Parking Lot", availability: 10 },
        { name: "Restaurant" },
        { name: "Pharmacy" }
      ],
      reviews: [
        { user: "John Doe", comment: "Great service, very attentive staff!", rating: 5 },
        { user: "Jane Smith", comment: "Clean and efficient, would recommend!", rating: 4 },
        { user: "Mary Johnson", comment: "Very professional, but the waiting time was long.", rating: 3 },
        { user: "Carlos Rodriguez", comment: "The hospital has great facilities, but some staff could be friendlier.", rating: 4 },
      ],
      specializedDepartments: ["Oncology", "ICU"],
      healthPackages: [
        { name: "Basic Checkup", price: "$50" },
        { name: "Comprehensive Health Package", price: "$200" },
      ],
      admissionInfo: {
        documentsRequired: ["ID Proof", "Insurance"],
        paymentMethods: ["Cash", "Credit Card", "Insurance"],
      },
      staff: [
        {
          name: "Dr. Emily Smith",
          position: "Cardiologist",
          phone: "+1234567890",
          email: "emily.smith@hospital.com",
          history: "Dr. Emily has over 15 years of experience in cardiology...",
         // profilePicture: require("./assets/emily-smith.jpg"), // Replace with a real image path
        },
        {
          name: "John Doe",
          position: "Nurse",
          phone: "+0987654321",
          email: "john.doe@hospital.com",
          history: "John has been a compassionate nurse for 10 years...",
          //profilePicture: require("./assets/john-doe.jpg"), // Replace with a real image path
        },
        {
          name: "Dr. Sarah Johnson",
          position: "Neurologist",
          phone: "+1234561234",
          email: "sarah.johnson@hospital.com",
          history: "Dr. Sarah specializes in neurological disorders...",
        },
        {
          name: "Dr. Michael Lee",
          position: "Pediatrician",
          phone: "+5678901234",
          email: "michael.lee@hospital.com",
          history: "Dr. Michael has a passion for pediatric care...",
        },
      ],
    },
    {
      id: 2,
      name: "Metro Health Center",
      description:
        "Metro Health Center is renowned for its compassionate care and modern medical facilities, providing comprehensive healthcare services.",
      location: "789 Care Ave, Metropolis",
      image: hospital2Img,
      staff: [
        {
          name: "Dr. Emily Smith",
          position: "Cardiologist",
          phone: "+1234567890",
          email: "emily.smith@hospital.com",
          history: "Dr. Emily has over 15 years of experience in cardiology...",
         // profilePicture: require("./assets/emily-smith.jpg"), // Replace with a real image path
        },
        {
          name: "John Doe",
          position: "Nurse",
          phone: "+0987654321",
          email: "john.doe@hospital.com",
          history: "John has been a compassionate nurse for 10 years...",
          //profilePicture: require("./assets/john-doe.jpg"), // Replace with a real image path
        },
        {
          name: "Dr. Sarah Johnson",
          position: "Neurologist",
          phone: "+1234561234",
          email: "sarah.johnson@hospital.com",
          history: "Dr. Sarah specializes in neurological disorders...",
        },
        {
          name: "Dr. Michael Lee",
          position: "Pediatrician",
          phone: "+5678901234",
          email: "michael.lee@hospital.com",
          history: "Dr. Michael has a passion for pediatric care...",
        },
      ],
    },
    {
      id: 3,
      name: "Pinewood Medical Facility",
      description:
        "Pinewood Medical Facility specializes in family medicine and preventive care for all age groups, with a dedicated team of professionals.",
      location: "123 Healing St, Pinewood",
      image: hospital3Img,
      staff: [
        {
          name: "Dr. Emily Smith",
          position: "Cardiologist",
          phone: "+1234567890",
          email: "emily.smith@hospital.com",
          history: "Dr. Emily has over 15 years of experience in cardiology...",
         // profilePicture: require("./assets/emily-smith.jpg"), // Replace with a real image path
        },
        {
          name: "John Doe",
          position: "Nurse",
          phone: "+0987654321",
          email: "john.doe@hospital.com",
          history: "John has been a compassionate nurse for 10 years...",
          //profilePicture: require("./assets/john-doe.jpg"), // Replace with a real image path
        },
        {
          name: "Dr. Sarah Johnson",
          position: "Neurologist",
          phone: "+1234561234",
          email: "sarah.johnson@hospital.com",
          history: "Dr. Sarah specializes in neurological disorders...",
        },
        {
          name: "Dr. Michael Lee",
          position: "Pediatrician",
          phone: "+5678901234",
          email: "michael.lee@hospital.com",
          history: "Dr. Michael has a passion for pediatric care...",
        },
      ],
    },
    {
      id: 4,
      name: "Lakeside Regional Hospital",
      description:
        "Lakeside Regional Hospital features a highly experienced surgical team and cutting-edge diagnostic services.",
      location: "456 Lakeview Dr, Lakeside",
      image: hospital4Img,
      staff: [
        {
          name: "Dr. Emily Smith",
          position: "Cardiologist",
          phone: "+1234567890",
          email: "emily.smith@hospital.com",
          history: "Dr. Emily has over 15 years of experience in cardiology...",
         // profilePicture: require("./assets/emily-smith.jpg"), // Replace with a real image path
        },
        {
          name: "John Doe",
          position: "Nurse",
          phone: "+0987654321",
          email: "john.doe@hospital.com",
          history: "John has been a compassionate nurse for 10 years...",
          //profilePicture: require("./assets/john-doe.jpg"), // Replace with a real image path
        },
        {
          name: "Dr. Sarah Johnson",
          position: "Neurologist",
          phone: "+1234561234",
          email: "sarah.johnson@hospital.com",
          history: "Dr. Sarah specializes in neurological disorders...",
        },
        {
          name: "Dr. Michael Lee",
          position: "Pediatrician",
          phone: "+5678901234",
          email: "michael.lee@hospital.com",
          history: "Dr. Michael has a passion for pediatric care...",
        },
      ],
    },
    {
      id: 5,
      name: "Bright Horizons Clinic",
      description:
        "Bright Horizons Clinic offers pediatric care, women’s health, and general wellness services in a family-friendly environment.",
      location: "789 Horizon Ln, Sunnyside",
      image: hospital5Img,
      staff: [
        {
          name: "Dr. Emily Smith",
          position: "Cardiologist",
          phone: "+1234567890",
          email: "emily.smith@hospital.com",
          history: "Dr. Emily has over 15 years of experience in cardiology...",
         // profilePicture: require("./assets/emily-smith.jpg"), // Replace with a real image path
        },
        {
          name: "John Doe",
          position: "Nurse",
          phone: "+0987654321",
          email: "john.doe@hospital.com",
          history: "John has been a compassionate nurse for 10 years...",
          //profilePicture: require("./assets/john-doe.jpg"), // Replace with a real image path
        },
        {
          name: "Dr. Sarah Johnson",
          position: "Neurologist",
          phone: "+1234561234",
          email: "sarah.johnson@hospital.com",
          history: "Dr. Sarah specializes in neurological disorders...",
        },
        {
          name: "Dr. Michael Lee",
          position: "Pediatrician",
          phone: "+5678901234",
          email: "michael.lee@hospital.com",
          history: "Dr. Michael has a passion for pediatric care...",
        },
      ],
    },
    {
      id: 6,
      name: "Evergreen Health Hub",
      description:
        "Evergreen Health Hub provides holistic healthcare services, including mental health support and chronic disease management.",
      location: "321 Evergreen Ave, Greenfield",
      image: hospital6Img,
      staff: [
        {
          name: "Dr. Emily Smith",
          position: "Cardiologist",
          phone: "+1234567890",
          email: "emily.smith@hospital.com",
          history: "Dr. Emily has over 15 years of experience in cardiology...",
         // profilePicture: require("./assets/emily-smith.jpg"), // Replace with a real image path
        },
        {
          name: "John Doe",
          position: "Nurse",
          phone: "+0987654321",
          email: "john.doe@hospital.com",
          history: "John has been a compassionate nurse for 10 years...",
          //profilePicture: require("./assets/john-doe.jpg"), // Replace with a real image path
        },
        {
          name: "Dr. Sarah Johnson",
          position: "Neurologist",
          phone: "+1234561234",
          email: "sarah.johnson@hospital.com",
          history: "Dr. Sarah specializes in neurological disorders...",
        },
        {
          name: "Dr. Michael Lee",
          position: "Pediatrician",
          phone: "+5678901234",
          email: "michael.lee@hospital.com",
          history: "Dr. Michael has a passion for pediatric care...",
        },
      ],
    },
  ];

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
    
      <Text style={styles.title}>Specific {type} Hospitals</Text>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
        <TextInput
            style={styles.searchBar}
            placeholder="Search hospitals..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
        />
        </View>


      {filteredHospitals.map((hospital) => (
        <View key={hospital.id} style={styles.card}>
          <Image source={hospital.image} style={styles.image} />
          <Text style={styles.hospitalName}>{hospital.name}</Text>
          <Text style={styles.description}>{hospital.description}</Text>
          <Text style={styles.locationTitle}>Location:</Text>
          <Text style={styles.location}>{hospital.location}</Text>
          {/* Button to view more details */}
         <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate("HospitalDetails", { hospital })
              }
            >
            <Text style={styles.buttonText}>More Details</Text>
          </TouchableOpacity>
        </View>
      ))}


   



    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2C3E50",
    marginBottom: 20,
    textAlign: "center",
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
    height: 200,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: "cover",
  },
  hospitalName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginBottom: 10,
    textAlign: "left",
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginTop: 10,
  },
  location: {
    fontSize: 14,
    color: "#555",
    textAlign: "left",
    marginBottom: 10,
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
    fontSize: 16,
    fontWeight: "600",
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff", 
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    padding: 5,
    width: "90%",
    maxWidth: 350,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: "#F9FAFB",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E4E4E4", 
  },
  searchButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 8,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 20,
    flex: 1,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
  },
  staffList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  staffItem: {
    width: "48%",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ecf0f1",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  staffImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  staffTextContainer: {
    alignItems: "center",
  },
  staffName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
    marginBottom: 5,
  },
  staffPosition: {
    fontSize: 14,
    color: "#7f8c8d",
  },
  detailsContainer: {
    alignItems: "center",
  },
  detailsImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  detailsName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  detailsPosition: {
    fontSize: 16,
    color: "#7f8c8d",
    marginBottom: 10,
  },
  detailsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34495e",
    marginTop: 15,
    marginBottom: 5,
  },
  detailsInfo: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 14,
    color: "#7f8c8d",
    lineHeight: 20,
    textAlign: "center",
  },
});

export default SpecificGeneralHospitals;
