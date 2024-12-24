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


import psychiatricHospital1Img from "../assets/images/TranquilMindsPsychiatricHospital.jpg";
import psychiatricHospital2Img from "../assets/images/HealingHandsMentalHealthCenter.jpg";
import psychiatricHospital3Img from "../assets/images/HopefulHorizonsPsychiatricInstitute.jpg";
import psychiatricHospital4Img from "../assets/images/TheMindcareHospital.webp";
import psychiatricHospital5Img from "../assets/images/SerenitySpringsPsychiatricCenter.jpg";
import psychiatricHospital6Img from "../assets/images/MentalWellnessHospital.jpg";

const SpecificPsychiatricHospitals = ({ navigation, route }) => {
  const { type } = route.params;

  const [searchQuery, setSearchQuery] = useState("");

  const hospitals = [
    {
      id: 1,
      name: "Tranquil Minds Psychiatric Hospital",
      description:
        "Tranquil Minds Psychiatric Hospital offers specialized psychiatric care for individuals with mental health conditions, focusing on therapy and counseling.",
      location: "123 Calm Ave, Mindstown",
      image: psychiatricHospital1Img,
    },
    {
      id: 2,
      name: "Healing Hands Mental Health Center",
      description:
        "Healing Hands Mental Health Center provides a comprehensive range of mental health services, including inpatient and outpatient care, psychotherapy, and psychiatric support.",
      location: "456 Healing Blvd, Serenity City",
      image: psychiatricHospital2Img,
    },
    {
      id: 3,
      name: "Hopeful Horizons Psychiatric Institute",
      description:
        "Hopeful Horizons Psychiatric Institute is dedicated to offering compassionate and personalized psychiatric care to help individuals navigate mental health challenges.",
      location: "789 Horizon Dr, Peaceville",
      image: psychiatricHospital3Img,
    },
    {
      id: 4,
      name: "The Mindcare Hospital",
      description:
        "The Mindcare Hospital specializes in treating mental health conditions, offering both inpatient and outpatient services with a focus on rehabilitation and support.",
      location: "234 Mindcare Rd, Wellness Town",
      image: psychiatricHospital4Img,
    },
    {
      id: 5,
      name: "Serenity Springs Psychiatric Center",
      description:
        "Serenity Springs Psychiatric Center provides comprehensive care for psychiatric disorders, offering a range of treatment options including therapy, medication management, and crisis intervention.",
      location: "567 Serenity Dr, Calmfield",
      image: psychiatricHospital5Img,
    },
    {
      id: 6,
      name: "Mental Wellness Hospital",
      description:
        "Mental Wellness Hospital offers advanced psychiatric treatments for individuals struggling with mental health conditions, focusing on recovery and long-term wellness.",
      location: "890 Wellness Way, Tranquil Hills",
      image: psychiatricHospital6Img,
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
          placeholder="Search psychiatric hospitals..."
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

export default SpecificPsychiatricHospitals;
