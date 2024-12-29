import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomLink from "../components/CustomLink";

const SignupScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState(""); // New field for Full Name
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // New field for Phone Number
  const [dateOfBirth, setDateOfBirth] = useState(""); // New field for Date of Birth
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    try {
      const response = await fetch("http://192.168.0.41:5196/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          dateOfBirth,
          password,
        }),
      });
  
      const contentType = response.headers.get("content-type");
      const responseText = await response.text();
      console.log("Raw response:", responseText);
  
      if (contentType && contentType.includes("application/json")) {
        const data = JSON.parse(responseText);
        if (!response.ok) {
          alert(`Signup Failed: ${data.message || "Unknown error"}`);
          return;
        }
      } else if (!response.ok) {
        alert(`Signup Failed: ${responseText}`);
        return;
      }
  
      alert("Signup successful!");
      navigation.replace("EditProfile");
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
      <CustomInput
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <CustomInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />
      <CustomInput
        placeholder="Date of Birth (YYYY-MM-DD)"
        value={dateOfBirth}
        onChangeText={setDateOfBirth}
      />
      <CustomInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <CustomButton
        title="Sign Up"
        onPress={handleSignup}
        backgroundColor="#009688"
      />
      <CustomLink
        text="Already have an account? Login"
        onPress={() => navigation.navigate("Login")}
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

export default SignupScreen;
