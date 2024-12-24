import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";

import childrenHospital1Img from "../assets/images/LittleHeartsChildren'sHospital.jpg";
import childrenHospital2Img from "../assets/images/RainbowChildren'sMedicalCenter.jpg";
import childrenHospital3Img from "../assets/images/CaringHandsChildren'sHospital.jpg";
import childrenHospital4Img from "../assets/images/Children'sHopeMedicalCenter.webp";
import childrenHospital5Img from "../assets/images/SunnyDayPediatricHospital.jpg";
import childrenHospital6Img from "../assets/images/StarbrightChildren'sHospital.webp";

const SpecificChildrenHospitals = ({ navigation, route }) => {
  const { type } = route.params;

  const [searchQuery, setSearchQuery] = useState("");

  const hospitals = [
    {
      id: 1,
      name: "Little Hearts Children's Hospital",
      description:
        "Little Hearts Children's Hospital provides expert care for children of all ages, specializing in pediatrics, neonatal care, and surgery.",
      location: "123 Little Hearts St, Kidsville",
      image: childrenHospital1Img,
    },
    {
      id: 2,
      name: "Rainbow Children's Medical Center",
      description:
        "Rainbow Children's Medical Center offers comprehensive care for infants, children, and adolescents with a focus on holistic health.",
      location: "456 Rainbow Blvd, Sunnydale",
      image: childrenHospital2Img,
    },
    {
      id: 3,
      name: "Caring Hands Children's Hospital",
      description:
        "Caring Hands Children's Hospital specializes in child care, providing pediatric emergency services, immunizations, and developmental screenings.",
      location: "789 Caring Ln, Brighttown",
      image: childrenHospital3Img,
    },
    {
      id: 4,
      name: "Children's Hope Medical Center",
      description:
        "Children's Hope Medical Center is dedicated to providing top-quality care for children with chronic conditions and complex medical needs.",
      location: "234 Hope Rd, Joyville",
      image: childrenHospital4Img,
    },
    {
      id: 5,
      name: "Sunny Day Pediatric Hospital",
      description:
        "Sunny Day Pediatric Hospital offers child-friendly environments with specialized care for childhood illnesses, injuries, and surgeries.",
      location: "567 Sunny Dr, Greenfield",
      image: childrenHospital5Img,
    },
    {
      id: 6,
      name: "Starbright Children's Hospital",
      description:
        "Starbright Children's Hospital is known for its advanced pediatric care, including pediatric oncology, cardiology, and general pediatrics.",
      location: "890 Star Rd, Brightland",
      image: childrenHospital6Img,
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
          placeholder="Search children's hospitals..."
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
            onPress={() => alert(`More details about ${hospital.name}`)}
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
});

export default SpecificChildrenHospitals;
