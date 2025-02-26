import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import RefereshReminders from './HomeScreen';
import { useFocusEffect } from '@react-navigation/native';


const AddReminderScreen = ({ route }) => {
  const [reminderMessage, setReminderMessage] = useState('');
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [reminderStatus, setReminderStatus] = useState('once');
  const [statusOptions] = useState(['Once', 'Daily', 'Weekly']);

  const { refreshReminders } = route.params; 

    // Clear state when the component unmounts
    useFocusEffect(
      React.useCallback(() => {
        // Reset state when the screen is focused
        setReminderMessage('');
        setReminderTime(new Date());
        setReminderStatus('once');
      }, [])
    );

  const handleSaveReminder = async () => {
    if (!reminderMessage || !reminderTime) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const newReminder = {
      id: 0,
      userId: 1,
      message: reminderMessage,
      time: reminderTime.toISOString(),
      status: reminderStatus.toLowerCase(),
    };

    try {
      const response = await fetch('http://192.168.0.36:5196/api/Reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReminder),
      });

      if (!response.ok) {
        const data = await response.json();
        Alert.alert('Error', `Failed to save reminder: ${data.message}`);
        return;
      }

      Alert.alert('Success', 'Reminder saved successfully!');
      refreshReminders();
      // Navigate to the reminders list or other appropriate screen
    } catch (error) {
      console.error('Error saving reminder:', error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };

  const handleTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      setReminderTime(selectedDate);
    }
    setShowDatePicker(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Reminder</Text>

      {/* Message Input */}
      <View style={styles.card}>
        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your reminder message"
          value={reminderMessage}
          onChangeText={setReminderMessage}
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
            {reminderTime.toLocaleString('en-US', {
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
            value={reminderTime}
            mode="datetime"
            display="default"
            onChange={handleTimeChange}
          />
        )}
      </View>

      {/* Status Options */}
      <View style={styles.card}>
        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.statusButton,
                reminderStatus === option.toLowerCase()
                  ? styles.selectedStatusButton
                  : {},
              ]}
              onPress={() => setReminderStatus(option.toLowerCase())}
            >
              <Text
                style={[
                  styles.statusButtonText,
                  reminderStatus === option.toLowerCase()
                    ? styles.selectedStatusButtonText
                    : {},
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveReminder}>
        <Ionicons name="checkmark-done" size={20} color="#fff" />
        <Text style={styles.saveButtonText}>Save Reminder</Text>
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
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statusButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  selectedStatusButton: {
    backgroundColor: '#4caf50',
  },
  statusButtonText: {
    fontSize: 14,
    color: '#333',
  },
  selectedStatusButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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

export default AddReminderScreen;
