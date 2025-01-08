import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/MaterialIcons"; 

const AppointmentBooking = ({ route, navigation }) => {
  const { hospital } = route.params; 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(hospital.staff[0].name);
  const [modalVisible, setModalVisible] = useState(false); 

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };


  const validateInputs = () => {
    // Full Name Validation
    const nameRegex = /^[a-zA-Z\s]{3,}$/; 
    if (!nameRegex.test(name)) {
      alert("Please enter a valid full name (at least 3 characters, letters only).");
      return false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    // Phone Number Validation
    const phoneRegex = /^\d{10}$/; 
    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }

    return true;
  };

    const handleBooking = async () => {
      if (!validateInputs()) {
        return; 
      }

    const appointmentDetails = {
      name,
      email,
      phone,
      date: date.toISOString(),
      staff: selectedStaff,
      hospitalId: hospital.id, 
    };

    try {
      const response = await fetch(
        "http://192.168.0.42:5196/api/Appointments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentDetails),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Appointment successfully booked!");
       
        // Clear input fields
        setName("");
        setEmail("");
        setPhone("");
        setDate(new Date());
        setSelectedStaff(hospital.staff[0].name);

        navigation.goBack();
      } else {
        const errorData = await response.json();
        alert(
          errorData.message ||
            "Failed to book the appointment. Please try again."
        );
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
    const renderStaffItem = ({ item }) => (
      <TouchableOpacity
        style={styles.staffItem}
        onPress={() => {
          setSelectedStaff(item.name);
          setModalVisible(false); 
        }}
      >
        <Text style={styles.staffName}>{item.name} - {item.position}</Text>
      </TouchableOpacity>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Go Back Button */}
      <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => {
            navigation.navigate("HospitalDetails", { hospital: route.params.hospital });
          }}
        >
            <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

      <Text style={styles.header}>Book an Appointment</Text>
      <Text style={styles.subHeader}>
        Schedule your visit to {hospital.name} and consult with a specialist.
      </Text>

      {/* User Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#777"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#777"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      {/* Staff Selection Button */}
      <Text style={styles.label}>Select a Specialist:</Text>
      <TouchableOpacity
        style={styles.staffButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.staffButtonText}>
          {selectedStaff ? selectedStaff : "Select Specialist"}
        </Text>
      </TouchableOpacity>

      {/* Modal for Staff Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <FlatList
              data={hospital.staff}
              renderItem={renderStaffItem}
              keyExtractor={(item) => item.name}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Date Picker */}
      <TouchableOpacity
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Book Button */}
      <TouchableOpacity style={styles.bookButton} onPress={handleBooking}>
        <Text style={styles.bookButtonText}>Confirm Appointment</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
    padding: 20,
    backgroundColor: "#f7f9fb",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#2c3e50",
    marginVertical: 15,
    textAlign: "center",
  },
  subHeader: {
    fontSize: 16,
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dfe6e9",
    marginBottom: 15,
    fontSize: 16,
    color: "#2c3e50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 5,
  },
  staffButton: {
    backgroundColor: "#ecf0f1",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dfe6e9",
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  staffButtonText: {
    fontSize: 16,
    color: "#34495e",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    maxHeight: "80%",
  },
  staffItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ecf0f1",
  },
  staffName: {
    fontSize: 16,
    color: "#34495e",
  },
  closeButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  datePicker: {
    backgroundColor: "#ecf0f1",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#34495e",
  },
  bookButton: {
    backgroundColor: "#1abc9c",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
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

export default AppointmentBooking;
