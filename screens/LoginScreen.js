import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
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
      const response = await fetch("http://192.168.0.41:5196/api/User/login", {
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

      const data = await response.json();
      updateUser({
        token: data.token, 
        email: email,     
        name: data.name || "", 
        profileImage: data.profileImage || null,
      });

      Alert.alert("Login Successful", "Welcome back!");
      navigation.replace("Profile");
    } catch (error) {
      Alert.alert("Error", "An error occurred during login.");
    }
  };

  return (
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
  );
};

const styles = StyleSheet.create({
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
