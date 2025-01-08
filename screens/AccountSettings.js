import React, { useContext, useState, useEffect } from "react";
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, } from "react-native";
import { UserContext } from "./UserContext";

const AccountSettings = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  useEffect(() => {
    setEmail(user.email || "");
  }, [user.email]);

  const handleSaveChanges = async () => {
    const updatedData = {
      email, 
      currentPassword: currentPassword || null, 
      newPassword: newPassword || null, 
    };
  
    try {
      const response = await fetch("http://192.168.255.242:5196/api/user/updateProfile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Update failed:", errorData);
        Alert.alert("Error", errorData.message || "Failed to update account.");
        return;
      }
      const data = await response.json();
      console.log("Update successful:", data);
  
      updateUser({
        token: data.token, 
        email: data.userData.email, 
      });
  
      Alert.alert("Success", "Account updated successfully!");
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error during account update:", error);
      Alert.alert("Error", "An error occurred while updating your account.");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Account Settings</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Current Password Input */}
      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your current password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />

      {/* New Password Input */}
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#455A64",
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AccountSettings;
