import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "./UserContext";

const EditProfile = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await fetch("http://192.168.0.41:5196/api/user/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();
        setName(data.fullName || "");
        setEmail(data.email || "");
        setPhone(data.phoneNumber || "");
        setProfileImage(data.profileImage || null);
        updateUser(data);
      } catch (error) {
        Alert.alert("Error", "Failed to load profile data.");
      }
    };

    loadProfileData();
  }, [user.token]);

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Camera roll permission is required to upload a profile image.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled) {
        setProfileImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Could not select image. Please try again.");
    }
  };
  const handleRemovePhoto = () => {
    setProfileImage(null);
  };

  const handleSave = async () => {
    const updatedData = {
      email,
      fullName: name,
      phoneNumber: phone,
      profileImage: profileImage || null,
    };
  
    try {
      const response = await fetch("http://192.168.0.36:5196/api/user/updateProfile", {
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
        Alert.alert("Error", `Failed to update profile: ${errorData.message || "Unknown error"}`);
        return;
      }
  
      const data = await response.json();
      console.log("Update response:", data);
      updateUser({
        token: data.token,
        fullName: data.userData.fullName,
        email: data.userData.email,
        phoneNumber: data.userData.phoneNumber,
        profileImage: data.userData.profileImage || "http://192.168.0.36:5196/assets/images/default-avatar.png",
      });
  
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error during update:", error);
      Alert.alert("Error", "An error occurred while updating your profile.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      <View style={styles.imageContainer}>
      <Image
  source={{
    uri: profileImage
      ? profileImage
      :"http://192.168.0.36:5196/assets/images/default-avatar.png" // Default avatar
  }}
  style={styles.profileImage}
/>
        <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
          <Text style={styles.imageButtonText}>
            {profileImage ? "Change Photo" : "Upload Photo"}
          </Text>
        </TouchableOpacity>
        {profileImage && (
          <TouchableOpacity style={styles.removeButton} onPress={handleRemovePhoto}>
            <Text style={styles.removeButtonText}>Remove Photo</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Name Input */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, { backgroundColor: "#e0e0e0" }]}
        placeholder="Enter your email"
        value={email}
        editable={false}
      />

      {/* Phone Input */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phone}
        keyboardType="phone-pad"
        onChangeText={setPhone}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imageButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  removeButton: {
    backgroundColor: "#f44336",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
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

export default EditProfile;
