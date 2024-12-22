import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import RefreshReminders from './HomeScreen';
import axios from 'axios';

const UpdateReminderScreen = ({ route, navigation }) => {
  const { refreshReminders, reminder } = route.params;

  const [message, setMessage] = useState(reminder.message);
  const [time, setTime] = useState(new Date(reminder.time));
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleUpdateReminder = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Message cannot be empty!');
      return;
    }

    try {
      const updatedReminder = {
        ...reminder,
        message,
        time: time.toISOString(),
      };

      await axios.put(
        `http://192.168.0.42:5196/api/Reminders/${reminder.id}`,
        updatedReminder
      );

      Alert.alert('Success', 'Reminder updated successfully!');
      refreshReminders();
      navigation.goBack();
    } catch (error) {
      console.error('Error updating reminder:', error);
      Alert.alert('Error', 'Failed to update the reminder. Please try again.');
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      setTime(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Reminder</Text>

      {/* Message Input */}
      <View style={styles.card}>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Update your reminder message"
          value={message}
          onChangeText={setMessage}
        />
      </View>

      {/* Reminder Time */}
      <View style={styles.card}>
        <Text style={styles.label}>Reminder Time</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Ionicons name="time-outline" size={20} color="#4caf50" />
          <Text style={styles.datePickerText}>
            {time.toLocaleString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={time}
            mode="datetime"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      {/* Update Button */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleUpdateReminder}
      >
        <Ionicons name="checkmark-done" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Update Reminder</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  datePickerText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#4caf50',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateReminderScreen;
