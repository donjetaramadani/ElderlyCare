import React from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Image, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon, Button } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import QuoteHeader from "../screens/QuoteHeader";
import { Vibration } from "react-native";
import { useHealthData } from "./HealthDataContext";
import { useState, useEffect} from 'react';
import AddReminderScreen from "./AddReminderScreen";
import UpdateReminderScreen from "./UpdateReminderScreen";
import axios from "axios";
import { Swipeable } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const HomePage = ({ navigation }) => {
  const { healthData, loading, error} = useHealthData();
  const [reminders, setReminders] = useState([]); 
  

  
  const handleEmergency = async () => {
    try {
      const sosData = {
        userId: 1, // Replace with actual user ID from your app's context or state
        location: "41.3275, 19.8189", // Replace with dynamic location if available
      };
  
      const response = await axios.post("http://192.168.0.42:5196/api/SOS", sosData);
  
      if (response.status === 201) {
        Alert.alert("Success", "SOS alert sent successfully!");
      } else {
        Alert.alert("Error", "Failed to send SOS alert. Please try again.");
      }
    } catch (error) {
      console.error("Error sending SOS alert:", error);
      Alert.alert("Error", "Something went wrong while sending the SOS alert.");
    }
  };



  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch("http://192.168.0.42:5196/api/Reminders");
        const data = await response.json();
        setReminders(data); // Save fetched reminders in state
      } catch (error) {
        console.error("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, []);
      // Callback function to refresh reminders
      const refreshReminders = async () => {
        try {
          const response = await fetch("http://192.168.0.42:5196/api/Reminders");
          const data = await response.json();
          setReminders(data);
        } catch (error) {
          console.error("Error refreshing reminders:", error);
        }
      };

  const renderRightActions = (id) => {
    return (
      <View style={styles.deleteContainer}>
      <TouchableOpacity
        style={styles.deleteAction}
        onPress={() => handleDeleteReminder(id)}
      >
        <Icon name="trash" type="feather" size={24} color="#fff" />
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
      </View>
    );
  };
  
  const handleDeleteReminder = async (id) => {
    try {
      // Delete reminder from the state
      const updatedReminders = reminders.filter((reminder) => reminder.id !== id);
      setReminders(updatedReminders);
  
      // If you want to delete it from the backend too:
      await fetch(`http://192.168.0.42:5196/api/Reminders/${id}`, {
        method: "DELETE",
      });
      
      Alert.alert("Success", "Reminder deleted successfully");
    } catch (error) {
      console.error("Error deleting reminder:", error);
      Alert.alert("Error", "Something went wrong while deleting the reminder");
    }
  };
  


  return (
   
    <SafeAreaView style={styles.container}>
      

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.mainContent}>

          {/* Header Section */}
          <QuoteHeader />
                  
    

              {/* Health Metrics Section */}
        <Text style={styles.sectionTitle}>Health Metrics</Text>
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <View style={styles.iconWrapper}>
              <Icon name="heart" type="feather" size={32} color="#FF6B6B" />
            </View>
            <Text style={styles.metricValue}>{healthData?.heartRate} bpm</Text>
            <Text style={styles.metricLabel}>Heart Rate</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.iconWrapper}>
              <Icon name="run" type="material-community" size={32} color="#4CAF50" />
            </View>
            <Text style={styles.metricValue}>{healthData?.steps}</Text>
            <Text style={styles.metricLabel}>Steps</Text>
          </View>
          <View style={styles.metricCard}>
            <View style={styles.iconWrapper}>
              <Icon
                name="fire"
                type="font-awesome-5"
                size={32}
                color="#FFA726"
              />
            </View>
            <Text style={styles.metricValue}>{healthData?.calories}</Text>
            <Text style={styles.metricLabel}>Calories</Text>
          </View>
        </View>


        {/* Reminders Section */}
        <Text style={styles.sectionTitle}>Reminders</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.remindersScroll}>
          {reminders.map((reminder) => (
                  <Swipeable
                    key={reminder.id}
                    renderRightActions={() => renderRightActions(reminder.id)}
                  >
                  <TouchableOpacity
                    onPress={() => navigation.navigate('UpdateReminderScreen', { reminder, refreshReminders })}
                  >
              <View style={styles.reminderCard} key={reminder.id}>
                <LinearGradient colors={["#6A11CB", "#2575FC"]} style={styles.gradientCard}>
                  <Icon name="bell" type="feather" size={24} color="#fff" />
                  <Text style={styles.reminderText}>{reminder.message}</Text>
                  <Text style={styles.reminderText}>{new Date(reminder.time).toLocaleTimeString()}</Text>
                </LinearGradient>
              </View>
                    </TouchableOpacity>
                    </Swipeable>
          ))}
        </ScrollView>



                    {/* QuickActions Section */}
          <View style={styles.quickActionsContainer}>
            <Text style={styles.enhancedTitle}>🚀 Quick Actions</Text>
            <View style={styles.quickActions}>
              {/* Call Doctor Action */}
              <TouchableOpacity style={styles.actionButton}>
                <LinearGradient
                  colors={["#667eea", "#764ba2"]}
                  style={[styles.iconCircle, styles.shadow]}
                >
                  <Icon name="phone" type="feather" size={28} color="#fff" />
                </LinearGradient>
                <Text style={styles.actionText}>Call Doctor</Text>
              </TouchableOpacity>

              {/* Add Reminder Action */}
              <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AddReminderScreen', { refreshReminders: refreshReminders })}>
                <LinearGradient
                  colors={["#fbc2eb", "#a6c1ee"]}
                  style={[styles.iconCircle, styles.shadow]}
                >
                  <Icon name="bell" type="feather" size={28} color="#fff" />

                </LinearGradient>
                <Text style={styles.actionText}>Add Reminder</Text>
              </TouchableOpacity>
            </View>
          </View>




      {/* Emergency SOS Button */}
        <View style={styles.sosContainer}>
          <LinearGradient
            colors={["#FF416C", "#FF4B2B"]}
            style={styles.sosButtonGradient}
          >
            <TouchableOpacity style={styles.sosButton} onPress={handleEmergency}>
              <Icon name="alert-circle" type="feather" size={32} color="#fff" />
              <Text style={styles.sosButtonText}>SOS</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>


      </ScrollView>

    </SafeAreaView>
   
  );
};

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingBottom: -60, 
  },
  header: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: "relative",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImageWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.7)",
    padding: 5,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  greetingContainer: {
    flex: 1,
    marginLeft: 15,
  },
  greetingText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  dateText: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 5,
  },
  settingsButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  
  mainContent: {
    padding: 20,
  },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "30%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  metricLabel: {
    fontSize: 14,
    color: "#888",
    fontWeight: "600",
  },
  
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#4C51BF",
  },
  reminderCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
  },
  reminderText: {
    marginLeft: 10,
    fontSize: 16,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#4C51BF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "45%",
    elevation: 3,
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    color: "#fff",
  },
  sosContainer: {
    marginTop: 20, // Add margin to push the button down
    alignItems: "center",
  },
  
  sosButtonGradient: {
    width: "80%",
    borderRadius: 50,
    paddingVertical: 5,
    elevation: 10,
    shadowColor: "#FF4B2B",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  
  sosButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
  },
  
  sosButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  
  remindersScroll: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  reminderCard: {
    borderRadius: 15,
    marginRight: 15,
    width: 180, // Fixed card width
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  gradientCard: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  reminderText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: "45%",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  actionText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  quickActionsContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  enhancedTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#4a4a4a",
    textShadowColor: "#d1d1d1",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionButton: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#4a4a4a",
    fontWeight: "500",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 24, 
    fontWeight: "bold", 
    color: "#2C5364", 
    marginBottom: 15, 
    textAlign: "center",
    letterSpacing: 1.5, 
    textShadowColor: "rgba(0, 0, 0, 0.3)", 
    textShadowOffset: { width: 1, height: 1 }, 
    textShadowRadius: 5,
  },
  deleteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "transparent",
  },
  deleteAction: {
    width: 80,
    height: "100%",
    backgroundColor: "#FF4B4B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    elevation: 5,
  },
  deleteText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
  }
});

export default HomePage;
