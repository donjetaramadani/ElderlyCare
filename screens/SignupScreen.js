import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import CustomLink from "../components/CustomLink";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment"; // For formatting the date
import { UserContext } from "./UserContext"; // Import UserContext correctly

const SignupScreen = ({ navigation }) => {
  const { updateUser } = useContext(UserContext); // Use useContext hook
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const handleSignup = async () => {
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "Passwords do not match.");
      return;
    }
    if (!dateOfBirth) {
      Alert.alert("Missing Date of Birth", "Please select your date of birth.");
      return;
    }

    try {
      // Sign up the user
      const response = await fetch("http://192.168.255.242:5196/api/User/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          phoneNumber,
          dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"), // Convert to YYYY-MM-DD
          password,
        }),
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        const errorData = JSON.parse(responseText);
        Alert.alert("Signup Failed", errorData.message || "Unknown error.");
        return;
      }

      const data = JSON.parse(responseText);
      console.log("Signup successful:", data);

      // Log in the user automatically after signup
      const loginResponse = await fetch("http://192.168.255.242:5196/api/User/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!loginResponse.ok) {
        const loginError = await loginResponse.json();
        Alert.alert("Login Failed", loginError.message || "Unknown error.");
        return;
      }

      const loginData = await loginResponse.json();
      console.log("Login successful:", loginData);

      // Save the user data and token in the context
      updateUser({
        token: loginData.token,
        name: fullName,
        email,
        phoneNumber,
        profileImage: null,
      });

      // Navigate to the Profile screen
      navigation.replace("Profile");
    } catch (error) {
      console.error("Error during signup/login:", error);
      Alert.alert("Error", "An error occurred. Please try again later.");
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (selectedDate) => {
    setDateOfBirth(selectedDate); // Set the selected date
    hideDatePicker();
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
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={showDatePicker}
      >
        <Text style={styles.datePickerText}>
          {dateOfBirth
            ? moment(dateOfBirth).format("YYYY-MM-DD") // Format selected date
            : "Select your date of birth"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()} // Prevent future dates
        display="spinner"
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
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
    color: "#555",
  },
});

export default SignupScreen;
