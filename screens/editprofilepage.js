import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from './UserContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfile = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext); // Access context
  const [name, setName] = useState(user.name || '');
  const [email, setEmail] = useState(user.email || '');
  const [phone, setPhone] = useState(user.phone || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || null);

  useEffect(() => {
    const loadProfileData = async () => {
      const storedData = await AsyncStorage.getItem('userProfile');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setName(parsedData.name);
        setEmail(parsedData.email);
        setPhone(parsedData.phone);
        setProfileImage(parsedData.profileImage);
        updateUser(parsedData);
      }
    };
    loadProfileData();
  }, []);

  const handleImagePick = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to upload your profile image.");
      return;
    } 
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], 
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });
  
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };
  
  const handleSave = async () => {
    const updatedData = {
      name,
      email,
      phone,
      profileImage,
    };
    updateUser(updatedData);
    await AsyncStorage.setItem('userProfile', JSON.stringify(updatedData));
    alert('Profile Updated Successfully!');
    navigation.navigate('Profile');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Profile Image */}
      <TouchableOpacity style={styles.imageContainer} onPress={handleImagePick}>
        {profileImage ? (
          <Image source={{ uri: profileImage }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>Tap to select image</Text>
        )}
      </TouchableOpacity>

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
        keyboardType="email-address"
        onChangeText={setEmail}
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

      {/* Save Button */}
      <Button title="Save Changes" onPress={handleSave} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#455A64',
    textAlign: 'center',
    marginBottom: 20,
  },
  imageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  imagePlaceholder: {
    color: '#888',
    fontSize: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#455A64',
    alignSelf: 'flex-start',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default EditProfile;
