import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomLink from "../components/CustomLink";

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    alert("Signup successful!");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>
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
      <CustomInput
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <CustomButton title="Sign Up" onPress={handleSignup} backgroundColor="#009688" />
      <CustomLink
        text="Already have an account? Login"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
});

export default SignupScreen;
