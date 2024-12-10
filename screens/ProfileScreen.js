import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import LoginScreen from "./LoginScreen";
import SignupScreen from "./SignupScreen";

const Stack = createStackNavigator();

const ProfileHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to ElderlyCare</Text>
      <Text style={styles.subHeader}>Please log in or sign up to continue</Text>
      {/* Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      {/* Signup Button */}
      <TouchableOpacity
        style={[styles.button, styles.signupButton]}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileHome"
        component={ProfileHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignupScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#009688",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
