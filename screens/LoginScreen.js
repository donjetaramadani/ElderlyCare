import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert, ScrollView  } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomLink from "../components/CustomLink";
import { UserContext } from "./UserContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { updateUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.0.36:5196/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Alert.alert("Login Failed", errorData.message || "Unknown error.");
        return;
      }

      const loginData = await response.json();
      const profileResponse = await fetch("http://192.168.0.36:5196/api/User/profile", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginData.token}`,
          "Content-Type": "application/json",
        },
      });

      if (!profileResponse.ok) {
        const profileErrorData = await profileResponse.json();
        Alert.alert("Error", profileErrorData.message || "Failed to fetch profile.");
        return;
      }

      const profileData = await profileResponse.json();
      updateUser({
        token: loginData.token,           
        email: profileData.email,         
        name: profileData.fullName || "",  
        phoneNumber: profileData.phoneNumber || "", 
        profileImage: profileData.profileImage || null, 
        dateOfBirth: profileData.dateOfBirth || "",
      });

      Alert.alert("Login Successful", "Welcome back!");
      navigation.replace("Profile"); 
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert("Error", "An error occurred during login. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton
        title="Login"
        onPress={handleLogin}
        backgroundColor="#4CAF50"
      />
      <CustomLink
        text="Don’t have an account? Sign up"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default LoginScreen;
