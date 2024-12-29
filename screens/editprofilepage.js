import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { UserContext } from './UserContext';

const EditProfile = ({ navigation }) => {
  const { user, updateUser } = useContext(UserContext); // Access context
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await fetch('http://192.168.0.41:5196/api/User/getProfile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }

        const data = await response.json();
        setName(data.fullName || '');
        setEmail(data.email || '');
        setPhone(data.phoneNumber || '');
        setProfileImage(data.profileImage || null);
        updateUser(data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        Alert.alert('Error', 'Failed to load profile data. Please try again later.');
      }
    };

    loadProfileData();
  }, [user.token]);

  const handleImagePick = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'We need camera roll permissions to upload your profile image.');
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
      console.error('Error selecting image:', error);
    }
  };

  const handleSave = async () => {
    const updatedData = {
      ...(name && { fullName: name }),
      ...(phone && { phoneNumber: phone }),
      ...(profileImage && { profileImage }),
    };

    try {
      const response = await fetch('http://192.168.0.41:5196/api/User/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Update failed:', error);
        Alert.alert('Error', `Failed to update profile: ${error.message || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      updateUser(data);
      Alert.alert('Success', 'Profile updated successfully!');
      navigation.navigate('Profile');
    } catch (error) {
      console.error('Error during update:', error);
      Alert.alert('Error', 'An error occurred while updating your profile.');
    }
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
        style={[styles.input, { backgroundColor: '#e0e0e0' }]} // Read-only field
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
