import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import { UserContext } from "./UserContext";

const NotificationSettings = () => {
  const { user } = useContext(UserContext); // Access user data from context
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);

  useEffect(() => {
    const fetchNotificationPreferences = async () => {
      try {
        const response = await fetch(
          "http://192.168.255.242:5196/api/User/profile/notifications",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`, // Use token from context
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to fetch preferences:", errorData);
          throw new Error(errorData.message || "Error fetching preferences.");
        }

        const data = await response.json();
        setEmailNotifications(data.preferences.emailNotifications);
        setPushNotifications(data.preferences.pushNotifications);
        setSmsNotifications(data.preferences.smsNotifications);
      } catch (error) {
        console.error("Error fetching preferences:", error);
        Alert.alert("Error", "Failed to load notification preferences.");
      }
    };

    fetchNotificationPreferences();
  }, [user.token]);

  const saveNotificationPreferences = async () => {
    try {
      const response = await fetch(
        "http://192.168.255.242:5196/api/User/profile/notifications",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emailNotifications,
            pushNotifications,
            smsNotifications,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to update preferences:", errorData);
        Alert.alert("Error", errorData.message || "Failed to save preferences.");
        return;
      }

      Alert.alert("Success", "Notification preferences updated successfully.");
    } catch (error) {
      console.error("Error updating preferences:", error);
      Alert.alert("Error", "Failed to save notification preferences.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notification Preferences</Text>

      <View style={styles.setting}>
        <Text>Email Notifications</Text>
        <Switch
          value={emailNotifications}
          onValueChange={setEmailNotifications}
        />
      </View>

      <View style={styles.setting}>
        <Text>Push Notifications</Text>
        <Switch
          value={pushNotifications}
          onValueChange={setPushNotifications}
        />
      </View>

      <View style={styles.setting}>
        <Text>SMS Notifications</Text>
        <Switch value={smsNotifications} onValueChange={setSmsNotifications} />
      </View>

      <CustomButton
        title="Save Preferences"
        onPress={saveNotificationPreferences}
        backgroundColor="#4CAF50"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default NotificationSettings;
