import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert, ScrollView, } from "react-native";

const PrivacySettings = () => {
  const [dataSharing, setDataSharing] = useState(false); 
  const [profileVisibility, setProfileVisibility] = useState(true);

  const handleSavePreferences = async () => {
    try {
      const response = await fetch("http://192.168.0.41:247/api/User/privacy-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          dataSharing,
          profileVisibility,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Error", errorData.message || "Failed to save preferences.");
        return;
      }

      Alert.alert("Success", "Privacy preferences updated successfully.");
    } catch (error) {
      console.error("Error saving preferences:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Privacy Settings</Text>

      {/* Data Sharing Toggle */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Share Data with Caregivers</Text>
        <Switch
          value={dataSharing}
          onValueChange={setDataSharing}
        />
      </View>

      {/* Profile Visibility Toggle */}
      <View style={styles.settingContainer}>
        <Text style={styles.settingText}>Make Profile Public</Text>
        <Switch
          value={profileVisibility}
          onValueChange={setProfileVisibility}
        />
      </View>

      {/* Save Preferences Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSavePreferences}>
        <Text style={styles.saveButtonText}>Save Preferences</Text>
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
    marginBottom: 20,
    textAlign: "center",
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    elevation: 2,
  },
  settingText: {
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PrivacySettings;
