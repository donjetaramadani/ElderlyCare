import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Switch, Alert, ActivityIndicator } from "react-native";
import CustomButton from "../components/CustomButton";
import { UserContext } from "./UserContext";
import * as SignalR from "@microsoft/signalr"; // Import SignalR

const NotificationSettings = () => {
  const { user } = useContext(UserContext); // Access user data from context
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [loading, setLoading] = useState(false);
  const [connection, setConnection] = useState(null); // SignalR connection state

  useEffect(() => {
    if (!user?.token) {
      Alert.alert("Error", "User token is missing. Please log in again.");
      return;
    }

    const fetchNotificationPreferences = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "http://192.168.0.247:5196/api/User/profile/notifications",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${user.token}`,
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
        setEmailNotifications(data?.preferences?.emailNotifications || false);
        setPushNotifications(data?.preferences?.pushNotifications || false);
        setSmsNotifications(data?.preferences?.smsNotifications || false);
      } catch (error) {
        console.error("Error fetching preferences:", error);
        Alert.alert("Error", "Failed to load notification preferences.");
      } finally {
        setLoading(false);
      }
    };

    const setupSignalRConnection = async () => {
      try {
        const newConnection = new SignalR.HubConnectionBuilder()
        .withUrl("http://192.168.0.247:5196/hubs/notification", {
          skipNegotiation: true, 
          transport: SignalR.HttpTransportType.WebSockets, 
          accessTokenFactory: () => user.token,
        })
        .withAutomaticReconnect()
        .build();

        newConnection.on("UpdateNotificationPreferences", (updatedPreferences) => {
          // Update state with real-time changes from SignalR
          setEmailNotifications(updatedPreferences.emailNotifications);
          setPushNotifications(updatedPreferences.pushNotifications);
          setSmsNotifications(updatedPreferences.smsNotifications);

          Alert.alert(
            "Notification Updated",
            "Your notification preferences were updated in real time."
          );
        });

        await newConnection.start();
        console.log("SignalR connection established.");
        setConnection(newConnection);
      } catch (error) {
        console.error("Error establishing SignalR connection:", error);
        Alert.alert("Error", "Failed to connect to real-time updates.");
      }
    };

    fetchNotificationPreferences();
    setupSignalRConnection();

    return () => {
      if (connection) {
        connection.stop();
        console.log("SignalR connection closed.");
      }
    };
  }, [user.token]);

  const saveNotificationPreferences = async () => {
    if (!user?.token) {
      Alert.alert("Error", "User token is missing. Please log in again.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.0.247:5196/api/User/profile/notifications",
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
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default NotificationSettings;
