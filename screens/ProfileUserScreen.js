import React, { useContext } from "react";
import { View, Text, StyleSheet, Button, Image, ScrollView } from "react-native";
import { UserContext } from "./UserContext";

const Profile = ({ navigation }) => {
  const { user, logout } = useContext(UserContext);
  const handleLogout = () => {
    logout(); 
    navigation.replace("Login"); 
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image
          style={styles.profileImage}
          source={{
            uri: user.profileImage || "https://via.placeholder.com/100",
                  }}
        />
        <Text style={styles.profileName}>{user.name || "Name not set"}</Text>
        <Text style={styles.profileEmail}>{user.email || "Email not set"}</Text>
        <Button
          title="Edit Profile"
          onPress={() => navigation.navigate("EditProfile")} 
        />
      </View>

      {/* Statistics Section */}
      <Text style={styles.subtitle}>Your Statistics</Text>
      <View style={styles.card}>
        <Text style={styles.statText}>Steps This Week: <Text style={styles.statValue}>52,340</Text>
        </Text>
        <Text style={styles.statText}>Heart Rate Average: <Text style={styles.statValue}>72 BPM</Text>
        </Text>
        <Text style={styles.statText}>Hydration: <Text style={styles.statValue}>7.5 Liters</Text>
        </Text>
      </View>

      {/* Settings Section */}
      <Text style={styles.subtitle}>Settings</Text>
      <View style={styles.card}>
        <Button
          title="Account Settings"
          onPress={() => navigation.navigate("AccountSettings")}
          color="#1E88E5"
        />
      </View>
      <View style={styles.card}>
        <Button
          title="Privacy Settings"
          onPress={() => navigation.navigate("PrivacySettings")}
          color="#1E88E5"
        />
      </View>
      <View style={styles.card}>
        <Button
          title="Notification Preferences"
          onPress={() => navigation.navigate("NotificationSettings")}
          color="#1E88E5"
        />
      </View>

      {/* Logout Section */}
      <View style={styles.logoutCard}>
        <Button
          title="Log Out"
          onPress={handleLogout} 
          color="#D32F2F"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#455A64",
  },
  profileEmail: {
    fontSize: 16,
    color: "#6d6d6d",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#455a64",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutCard: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statText: {
    fontSize: 16,
    color: "#6d6d6d",
    marginBottom: 5,
  },
  statValue: {
    fontWeight: "bold",
    color: "#455a64",
  },
});

export default Profile;
