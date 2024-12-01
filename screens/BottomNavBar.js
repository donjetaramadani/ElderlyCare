import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigationState, useNavigation } from "@react-navigation/native";

const BottomNavBar = () => {
  const navigation = useNavigation();
  const state = useNavigationState((state) => state);

  // Get the active route name
  const activeRouteName = state?.routes[state.index]?.name;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Home")}
      >
        <MaterialCommunityIcons
          name="home"
          size={30}
          color={activeRouteName === "Home" ? "#0077B6" : "#BDBDBD"}
        />
        <Text style={[styles.navLabel, activeRouteName === "Home" && styles.activeLabel]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("HealthButton")}
      >
        <MaterialCommunityIcons
          name="heart"
          size={30}
          color={activeRouteName === "HealthButton" ? "#0077B6" : "#BDBDBD"}
        />
        <Text style={[styles.navLabel, activeRouteName === "HealthButton" && styles.activeLabel]}>
          Health
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Notifications")}
      >
        <MaterialCommunityIcons
          name="bell"
          size={30}
          color={activeRouteName === "Notifications" ? "#0077B6" : "#BDBDBD"}
        />
        <Text
          style={[styles.navLabel, activeRouteName === "Notifications" && styles.activeLabel]}
        >
          Alerts
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Profile")}
      >
        <MaterialCommunityIcons
          name="account"
          size={30}
          color={activeRouteName === "Profile" ? "#0077B6" : "#BDBDBD"}
        />
        <Text style={[styles.navLabel, activeRouteName === "Profile" && styles.activeLabel]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    height: 70,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
  },
  navItem: {
    alignItems: "center",
    padding: 10,
  },
  navLabel: {
    fontSize: 10,
    color: "#BDBDBD",
  },
  activeLabel: {
    color: "#0077B6",
    fontWeight: "bold",
  },
});

export default BottomNavBar;
