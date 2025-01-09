import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { UserContext } from "./UserContext";

const AccountSettings = ({ navigation }) => {
  const { user } = useContext(UserContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Account Settings</Text>

      {/* Change Password Option */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("ChangePasswordScreen")}
      >
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      {/* Delete Account Option */}
      <TouchableOpacity
        style={[styles.option, styles.deleteOption]}
        onPress={() => navigation.navigate("DeleteAccountScreen")}
      >
        <Text style={[styles.optionText, styles.deleteOptionText]}>
          Delete Account
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
  },
  deleteOption: {
    backgroundColor: "#fddede",
  },
  deleteOptionText: {
    color: "#d32f2f",
  },
});

export default AccountSettings;
