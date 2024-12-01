import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerContainer}>
      {/* App Name */}
            <Text style={styles.logoText}>
                  |ElderlyCare
                  <Text style={styles.highlight}>+</Text>
        </Text>

      {/* Icons */}
      <View style={styles.iconContainer}>
        {/* Notifications */}
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications-outline" size={28} color="black" />
        </TouchableOpacity>
        {/* Profile */}
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons name="person-circle-outline" size={28} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 45, // Padding to push the header down
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  logoText: {
    fontFamily: "ProximaNova ", // Replace with your downloaded font name
    fontSize: 22,
    fontWeight: "bold",
    color: "#001",
    letterSpacing: 1, // Adds a futuristic touch
  },
  highlight: {
    color: "#0078D7", // Highlight color for "+"
  },
  iconContainer: {
    flexDirection: "row",
    gap: 20,
  },
});

export default Header;
