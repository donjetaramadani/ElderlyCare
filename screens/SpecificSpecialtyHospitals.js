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


import hospital1Img from "../assets/images/CardiologyCareHospital.jpg";
import hospital2Img from "../assets/images/NeuroMedHospital.webp";
import hospital3Img from "../assets/images/OrthoCareSpecialtyCenter.webp";
import hospital4Img from "../assets/images/PediatricHealthClinic.jpg";
import hospital5Img from "../assets/images/DermacareSkinCenter.webp";
import hospital6Img from "../assets/images/OncoCareCancerCenter.jpg";

const SpecificSpecialtyHospitals = ({ navigation, route }) => {
  const { type } = route.params;

  const [searchQuery, setSearchQuery] = useState("");

  const hospitals = [
    {
      id: 1,
      name: "Cardiology Care Hospital",
      description:
        "Cardiology Care Hospital specializes in heart-related treatments, offering advanced diagnostic and treatment options.",
      location: "101 Heart Ave, CardioCity",
      image: hospital1Img,
    },
    {
      id: 2,
      name: "NeuroMed Hospital",
      description:
        "NeuroMed Hospital is dedicated to the treatment of neurological disorders, with state-of-the-art facilities for brain and spine care.",
      location: "202 Neuro Rd, Brainville",
      image: hospital2Img,
    },
    {
      id: 3,
      name: "OrthoCare Specialty Center",
      description:
        "OrthoCare specializes in orthopedic treatments and rehabilitation services for bone and joint issues.",
      location: "303 Bone St, Orthotown",
      image: hospital3Img,
    },
    {
      id: 4,
      name: "Pediatric Health Clinic",
      description:
        "Pediatric Health Clinic offers expert care for children, including preventive healthcare, immunizations, and treatment of childhood illnesses.",
      location: "404 Kid's Blvd, Pediatown",
      image: hospital4Img,
    },
    {
      id: 5,
      name: "Dermacare Skin Center",
      description:
        "Dermacare Skin Center provides advanced dermatology services, focusing on skin conditions, treatments, and cosmetic procedures.",
      location: "505 Skin Ave, Dermacity",
      image: hospital5Img,
    },
    {
      id: 6,
      name: "OncoCare Cancer Center",
      description:
        "OncoCare Cancer Center is committed to providing top-tier cancer treatment, with multidisciplinary care and modern technology.",
      location: "606 Cancer St, Oncoville",
      image: hospital6Img,
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
          placeholder="Search specialty hospitals..."
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
});

export default SpecificSpecialtyHospitals;
