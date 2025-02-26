import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import * as signalR from '@microsoft/signalr';

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const hubConnection = useRef(null);

  // SignalR connection setup
  useEffect(() => {
    const connectSignalR = async () => {
      const connection =  new SignalR.HubConnectionBuilder()
      .withUrl("http://192.168.0.36:5196/hubs/notification", {
        skipNegotiation: true, // 
        transport: SignalR.HttpTransportType.WebSockets, 
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

      try {
        await connection.start();
        console.log("SignalR Connected");

        connection.on("ReceiveNotification", (message) => {
          setNotifications((prev) => [...prev, message]);
          Alert.alert("New Notification", message);
        });

        hubConnection.current = connection;
      } catch (error) {
        console.error("SignalR Connection Error:", error);
      }
    };

    connectSignalR();

    return () => {
      if (hubConnection.current) {
        hubConnection.current.stop();
      }
    };
  }, []);

  const sendTestNotification = () => {
    const testMessage = "This is a test notification!";
    setNotifications((prev) => [...prev, testMessage]);
    Alert.alert("Test Notification", testMessage);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Alerts</Text>

      {/* Static Alert Section */}
      <View style={[styles.card, styles.alertCard]}>
        <Text style={styles.alertTitle}>High Heart Rate Detected</Text>
        <Text style={styles.alertText}>Heart rate: 130 BPM</Text>
        <Text style={styles.alertText}>Time: 2:15 PM</Text>
        <Button title="View Details" onPress={() => alert('Viewing details for High Heart Rate.')} />
      </View>

      <View style={[styles.card, styles.alertCard]}>
        <Text style={styles.alertTitle}>Low Oxygen Saturation</Text>
        <Text style={styles.alertText}>SpO₂: 88%</Text>
        <Text style={styles.alertText}>Time: 9:30 AM</Text>
        <Button title="View Details" onPress={() => alert('Viewing details for Low Oxygen Saturation.')} />
      </View>

      <View style={[styles.card, styles.alertCard]}>
        <Text style={styles.alertTitle}>Fall Detected</Text>
        <Text style={styles.alertText}>Location: Living Room</Text>
        <Text style={styles.alertText}>Time: 8:45 AM</Text>
        <Button title="Contact Emergency" onPress={() => alert('Contacting emergency services.')} />
      </View>

      {/* SignalR-Driven Notifications */}
      <Text style={styles.subtitle}>Real-Time Notifications</Text>
      <Button title="Send Test Notification" onPress={sendTestNotification} />
      {notifications.length === 0 && (
        <Text style={styles.noNotificationsText}>No new notifications</Text>
      )}
      {notifications.map((notif, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.notificationText}>{notif}</Text>
        </View>
      ))}

      {/* Static Notification Section */}
      <Text style={styles.subtitle}>Recent Notifications</Text>
      <View style={styles.card}>
        <Text style={styles.notificationText}>Reminder: Take your medication at 10:00 AM</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.notificationText}>Daily Check: Update your hydration log.</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.notificationText}>System Update: Your wearable device firmware is up-to-date.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#f5f5f5' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#d32f2f' 
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  alertCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f',
  },
  alertTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#d32f2f' 
  },
  alertText: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#455a64' 
  },
  notificationText: { 
    fontSize: 16, 
    color: '#6d6d6d' 
  },
  noNotificationsText: {
    fontSize: 16,
    color: '#9e9e9e',
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default NotificationsScreen;
