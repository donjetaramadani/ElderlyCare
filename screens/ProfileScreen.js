import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const LoginSignupPage = ({ navigation }) => {

  const handleLoginPress = () => {
    // Navigate to the Login screen (assuming you've set up the navigation)
    navigation.navigate('Login');
  };

  const handleSignupPress = () => {
    // Navigate to the Sign Up screen (assuming you've set up the navigation)
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to ElderlyCare</Text>

      <Text style={styles.subHeader}>Please log in or sign up to continue</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={handleSignupPress}>
        <Text style={[styles.buttonText, styles.signUpText]}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>By continuing, you agree to our Terms of Service and Privacy Policy</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#455A64',
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    width: '100%',
    marginBottom: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  signUpButton: {
    backgroundColor: '#009688',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  signUpText: {
    color: '#fff',
  },
  footerText: {
    fontSize: 12,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default LoginSignupPage;
