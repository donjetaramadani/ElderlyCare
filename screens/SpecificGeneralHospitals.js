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
    },
    {
      id: 2,
      name: "Metro Health Center",
      description:
        "Metro Health Center is renowned for its compassionate care and modern medical facilities, providing comprehensive healthcare services.",
      location: "789 Care Ave, Metropolis",
      image: hospital2Img,
    },
    {
      id: 3,
      name: "Pinewood Medical Facility",
      description:
        "Pinewood Medical Facility specializes in family medicine and preventive care for all age groups, with a dedicated team of professionals.",
      location: "123 Healing St, Pinewood",
      image: hospital3Img,
    },
    {
      id: 4,
      name: "Lakeside Regional Hospital",
      description:
        "Lakeside Regional Hospital features a highly experienced surgical team and cutting-edge diagnostic services.",
      location: "456 Lakeview Dr, Lakeside",
      image: hospital4Img,
    },
    {
      id: 5,
      name: "Bright Horizons Clinic",
      description:
        "Bright Horizons Clinic offers pediatric care, women’s health, and general wellness services in a family-friendly environment.",
      location: "789 Horizon Ln, Sunnyside",
      image: hospital5Img,
    },
    {
      id: 6,
      name: "Evergreen Health Hub",
      description:
        "Evergreen Health Hub provides holistic healthcare services, including mental health support and chronic disease management.",
      location: "321 Evergreen Ave, Greenfield",
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

export default SpecificGeneralHospitals;
