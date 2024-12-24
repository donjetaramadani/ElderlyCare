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


import rehabHospital1Img from "../assets/images/SunriseRehabilitationCenter.webp";
import rehabHospital2Img from "../assets/images/HealingHandsRehabHospital.webp";
import rehabHospital3Img from "../assets/images/HopeRehabilitationInstitute.jpg";
import rehabHospital4Img from "../assets/images/SilverOakRehabFacility.webp";
import rehabHospital5Img from "../assets/images/OceanBreezeRehabilitation.jpg";
import rehabHospital6Img from "../assets/images/MountainPeakRehabilitation.avif";

const SpecificRehabilitationHospitals = ({ navigation, route }) => {
  const { type } = route.params;

  const [searchQuery, setSearchQuery] = useState("");

  const hospitals = [
    {
      id: 1,
      name: "Sunrise Rehabilitation Center",
      description:
        "Sunrise Rehabilitation Center offers personalized rehabilitation plans for physical therapy, speech therapy, and recovery after surgery.",
      location: "123 Sunrise Rd, Sun Valley",
      image: rehabHospital1Img,
    },
    {
      id: 2,
      name: "Healing Hands Rehab Hospital",
      description:
        "Healing Hands Rehab Hospital provides specialized physical therapy services, focusing on sports injuries, stroke recovery, and elderly care.",
      location: "456 Healing St, Riverdale",
      image: rehabHospital2Img,
    },
    {
      id: 3,
      name: "Hope Rehabilitation Institute",
      description:
        "Hope Rehabilitation Institute is dedicated to helping patients regain mobility and independence after traumatic injuries or surgery.",
      location: "789 Hope Ave, Riverton",
      image: rehabHospital3Img,
    },
    {
      id: 4,
      name: "Silver Oak Rehab Facility",
      description:
        "Silver Oak Rehab Facility offers comprehensive outpatient rehabilitation services, including physiotherapy and rehabilitation for chronic conditions.",
      location: "234 Oak Dr, Silverton",
      image: rehabHospital4Img,
    },
    {
      id: 5,
      name: "Ocean Breeze Rehabilitation",
      description:
        "Ocean Breeze Rehabilitation focuses on post-stroke rehabilitation, neurotherapy, and patient recovery with a relaxing beachside environment.",
      location: "567 Ocean Blvd, Coastline",
      image: rehabHospital5Img,
    },
    {
      id: 6,
      name: "Mountain Peak Rehabilitation",
      description:
        "Mountain Peak Rehabilitation offers specialized services for spinal cord injuries, brain injuries, and post-surgery rehabilitation.",
      location: "890 Mountain Rd, Highland Park",
      image: rehabHospital6Img,
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
          placeholder="Search rehabilitation hospitals..."
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

export default SpecificRehabilitationHospitals;
