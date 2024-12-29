import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, StyleSheet, ScrollView } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

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

  const handleBooking = () => {
    if (!name || !email || !phone) {
      alert("Please fill out all fields.");
      return;
    }
    alert(`Appointment successfully booked with ${selectedStaff}!`);
    navigation.goBack();
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
    padding: 20,
    backgroundColor: "#f7f9fb",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34495e",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: "#7f8c8d",
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
  },
  label: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 5,
  },
  staffButton: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dfe6e9",
    marginBottom: 20,
    alignItems: "center",
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
    borderRadius: 8,
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
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 15,
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
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default AppointmentBooking;
