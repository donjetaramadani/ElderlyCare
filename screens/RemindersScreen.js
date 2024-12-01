import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, FlatList } from "react-native";

export default function RemindersScreen() {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState("");

  const addReminder = () => {
    if (newReminder) {
      setReminders([...reminders, { id: Date.now().toString(), text: newReminder }]);
      setNewReminder("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.reminder}>{item.text}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Add a new reminder"
        value={newReminder}
        onChangeText={setNewReminder}
      />
      <Button title="Add Reminder" onPress={addReminder} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  reminder: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
