import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const hospitalTypes = [
  { id: 1, name: "General Hospitals", icon: "🏥", screen: "GeneralHospitals" },
  { id: 2, name: "Specialty Clinics", icon: "🔬", screen: "SpecialtyClinics" },
  { id: 3, name: "Rehabilitation Centers", icon: "🩺", screen: "RehabilitationCenters" },
  { id: 4, name: "Children's Hospitals", icon: "👶", screen: "ChildrensHospitals" },
  { id: 5, name: "Psychiatric Hospitals", icon: "🧠", screen: "PsychiatricHospitals" },
];

const HospitalTypes = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Hospital Type</Text>
      <View style={styles.grid}>
        {hospitalTypes.map((type) => (
          <TouchableOpacity
            key={type.id}
            style={styles.card}
            onPress={() => navigation.navigate(type.screen)}
          >
            <Text style={styles.icon}>{type.icon}</Text>
            <Text style={styles.name}>{type.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#333",
    marginBottom: 20,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderColor: "#ddd",
    borderWidth: 2,
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
    margin: 10,
    width: 150,
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    color: "#555",
  },
});

export default HospitalTypes;
