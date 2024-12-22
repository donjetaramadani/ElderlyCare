import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import DashboardScreen from "./screens/DashboardScreen";
import HealthButtonScreen from "./screens/HealthButtonScreen";
import NotificationsScreen from "./screens/NotificationsScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HeartHealth from "./screens/HeartHealth";
import Steps from "./screens/Steps";
import BloodPressure from "./screens/BloodPressure";
import OxygenSaturation from "./screens/OxygenSaturation";
import Temperature from "./screens/Temperature";
import Sleep from "./screens/Sleep";
import ECG from "./screens/ECG";
import RespiratoryRate from "./screens/RespiratoryRate";
import FallDetection from "./screens/FallDetection";
import BloodGlucose from "./screens/BloodGlucose";
import Hydration from "./screens/Hydration";
import Activity from "./screens/Activity";
import Cognitive from "./screens/Cognitive";
import GaitPosture from "./screens/GaitPosture";
import Environment from "./screens/Environment";
import { StyleSheet } from "react-native";
import AddReminderScreen from "./screens/AddReminderScreen";
import UpdateReminderScreen from "./screens/UpdateReminderScreen";

const Tab = createBottomTabNavigator();


export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: [styles.tabBarStyle], // Style for the tab bar
        headerShown: false, // Ensure no header overlaps
        tabBarInactiveTintColor: "#B0BEC5", // Style for inactive icons
        tabBarActiveTintColor: "#0077B6", // Style for active icons
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="HealthButton" component={HealthButtonScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="HeartHealth" component={HeartHealth} />
      <Tab.Screen name="Steps" component={Steps} />
      <Tab.Screen name="BloodPressure" component={BloodPressure} />
      <Tab.Screen name="OxygenSaturation" component={OxygenSaturation} />
      <Tab.Screen name="Temperature" component={Temperature} />
      <Tab.Screen name="Sleep" component={Sleep} />
      <Tab.Screen name="ECG" component={ECG} />
      <Tab.Screen name="RespiratoryRate" component={RespiratoryRate} />
      <Tab.Screen name="FallDetection" component={FallDetection} />
      <Tab.Screen name="BloodGlucose" component={BloodGlucose} />
      <Tab.Screen name="Hydration" component={Hydration} />
      <Tab.Screen name="Activity" component={Activity} />
      <Tab.Screen name="Cognitive" component={Cognitive} />
      <Tab.Screen name="GaitPosture" component={GaitPosture} />
      <Tab.Screen name="Environment" component={Environment} />
      <Tab.Screen name="AddReminderScreen" component={AddReminderScreen} />
      <Tab.Screen name="UpdateReminderScreen" component={UpdateReminderScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    
    borderTopWidth: 0, // Removes the white border
    elevation: 5, // Adds shadow for a professional look
    height: 60, // Adjusts the height for a balanced look
  },
});
