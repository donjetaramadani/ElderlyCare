import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

// List of motivational quotes
const quotes = [
  "Every day may not be good, but there’s something good in every day.",
  "Take it one step at a time. You’re doing great.",
  "Your health is your wealth. Take care of yourself.",
  "Breathe deeply and embrace the moment.",
];

const QuoteHeader = () => {
  const [quote, setQuote] = useState(""); // Current displayed quote
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation value for fade effect

  useEffect(() => {
    // Set the initial quote
    setQuote(getRandomQuote());

    // Initial fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Set up interval to change the quote every 6 hours
    const interval = setInterval(() => {
      // Fade-out animation before changing the quote
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();

      // Change the quote after fade-out completes
      setTimeout(() => {
        setQuote(getRandomQuote());
        // Fade-in animation for the new quote
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }).start();
      }, 800);
    }, 21600000); // 6 hours in milliseconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to get a random quote from the list
  const getRandomQuote = () =>
    quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <View style={styles.header}>
      <Text style={styles.title}>Elderly Care+</Text>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.quote}>{quote}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    marginTop: 15,
    backgroundColor: "#F9E4C9", // Softer peach for a warm and light feel
    borderRadius: 20, // Rounded corners for a modern look
    elevation: 10, // Enhanced shadow for depth
    shadowColor: "#D3B8A6", // Subtle shadow color for harmony
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    maxWidth: 360,
    minHeight: 220,
    borderWidth: 2,
    borderColor: "#E6C3A7",
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold", // Slightly bolder for better visibility
    color: "#5D4037", // Earthy brown for stability
    textAlign: "center",
    letterSpacing: 1.2,
    marginBottom: 18,
    fontFamily: "Roboto", // Clean sans-serif font for modernity
    textShadowColor: "#F8DCC3",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  quote: {
    fontSize: 18,
    color: "#4E4E4E", // Neutral gray for a timeless feel
    fontStyle: "italic", // Adds elegance and depth
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 28,
    fontFamily: "Georgia", // Serif font for a classic touch
    marginTop: 10,
    opacity: 0.95,
  },
});

export default QuoteHeader;
