import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons"; 

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

       {/* Go Back Button */}
       <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigation.navigate("Home"); 
        }}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

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
    position: "relative",
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

export default HospitalTypes;
