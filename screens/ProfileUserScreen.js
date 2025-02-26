import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import moment from "moment"; // Import moment.js for date formatting
import { UserContext } from "./UserContext";

const ProfileScreen = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext);
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    profileImage: null,
    dateOfBirth: "",
  });
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user?.token) {
        navigation.replace("ProfileHome");
      }
      try {
        const response = await fetch("http://192.168.0.36:5196/api/User/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error("Error fetching profile data:", errorData);
          throw new Error(errorData.message || "Failed to fetch profile data");
        }
    
        const data = await response.json();
        console.log("Fetched profile data:", data);
        setProfileData(data);
        updateUser({
          token: user.token,
          fullName: data.fullName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          profileImage: data.profileImage,
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        Alert.alert("Error", "Failed to fetch profile data.");
      }
    };
    
    fetchProfileData();
  }, [user?.token]); 
  const handleLogout = () => {
    updateUser(null);
    navigation.replace("ProfileHome");
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
<Image
  source={{
    uri: profileData.profileImage 
      ? profileData.profileImage 
      : "http://192.168.0.36:5196/assets/images/default-avatar.png"
  }}
  style={styles.profileImage}
/>
      <Text style={styles.name}>{profileData.fullName || "Name not set"}</Text>
      <Text style={styles.email}>{profileData.email || "Email not set"}</Text>
      <Text style={styles.phone}>{profileData.phoneNumber || "Phone not set"}</Text>
      <Text style={styles.dateOfBirth}>
        {profileData.dateOfBirth
          ? moment(profileData.dateOfBirth).format("MMMM D, YYYY") 
          : "Date of Birth not set"}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EditProfile")}
      >
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("NotificationSettings")}
      >
        <Text style={styles.buttonText}>Notification Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("PrivacySettings")}
      >
        <Text style={styles.buttonText}>Privacy Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AccountSettings")}
      >
        <Text style={styles.buttonText}>Account Settings</Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
    backgroundColor: "#ddd",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  email: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  phone: {
    fontSize: 16,
    color: "#666",
    marginBottom: 5,
  },
  dateOfBirth: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    width: "80%",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ProfileScreen;
