import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';

const NotificationsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Alerts</Text>

      {/* Alert Section */}
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

      {/* Notification Section */}
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
});

export default NotificationsScreen;

