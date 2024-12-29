import React, { useState, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomLink from "../components/CustomLink";
import { UserContext } from "./UserContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { updateUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (!email.includes("@")) {
        alert("Please enter a valid email.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }
    try {
        const response = await fetch("http://192.168.0.41:5196/api/User/login", { // Update this line
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        if (!response.ok) {
            alert("Invalid credentials.");
            return;
        }

        const data = await response.json();
        alert("Login successful!");
        navigation.replace("Profile");
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again later.");
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
