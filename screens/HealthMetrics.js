import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Import for tab navigation

import HeartHealth from "./HeartHealth";
import Steps from "./Steps";
import BloodPressure from "./BloodPressure";
import OxygenSaturation from "./OxygenSaturation";
import Temperature from "./Temperature";
import Sleep from "./Sleep";
import ECG from "./ECG";
import RespiratoryRate from "./RespiratoryRate";
import FallDetection from "./FallDetection";
import BloodGlucose from "./BloodGlucose";
import Hydration from "./Hydration";
import Activity from "./Activity";
import Cognitive from "./Cognitive";
import GaitPosture from "./GaitPosture";
import Environment from "./Environment";

const Tab = createBottomTabNavigator(); // Initialize tab navigator

const HealthMetrics = () => {
  const navigation = useNavigation();

  const handlePress = (metric) => {
    switch (metric) {
      case 'Heart Health':
        navigation.navigate('HeartHealth');
        break;
      case 'Steps':
        navigation.navigate('Steps');
        break;
      case 'Blood Pressure':
        navigation.navigate('BloodPressure');
        break;
      case 'Oxygen Saturation':
        navigation.navigate('OxygenSaturation');
        break;
      case 'Temperature':
        navigation.navigate('Temperature');
        break;
      case 'Sleep':
        navigation.navigate('Sleep');
        break;
      case 'ECG':
        navigation.navigate('ECG');
        break;
      case 'Respiratory Rate':
        navigation.navigate('RespiratoryRate');
        break;
      case 'Fall Detection':
        navigation.navigate('FallDetection');
        break;
      case 'Blood Glucose':
        navigation.navigate('BloodGlucose');
        break;
      case 'Hydration':
        navigation.navigate('Hydration');
        break;
      case 'Activity':
        navigation.navigate('Activity');
        break;
      case 'Cognitive':
        navigation.navigate('Cognitive');
        break;
      case 'Gait & Posture':
        navigation.navigate('GaitPosture');
        break;
      case 'Environment':
        navigation.navigate('Environment');
        break;
      default:
        alert(`No page for: ${metric}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {metrics.map(({ name, icon, color }, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { borderColor: color }]}
          onPress={() => handlePress(name)}
        >
          <Icon name={icon.name} type={icon.type} size={35} color={color} />
          <Text style={styles.label}>{name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const metrics = [
  { name: 'Heart Health', icon: { name: 'heartbeat', type: 'font-awesome' }, color: '#FF6B6B' },
  { name: 'Steps', icon: { name: 'shoe-prints', type: 'font-awesome-5' }, color: '#6B8E23' },
  { name: 'Blood Pressure', icon: { name: 'tint', type: 'font-awesome' }, color: '#4682B4' },
  { name: 'Oxygen Saturation', icon: { name: 'lungs', type: 'font-awesome-5' }, color: '#FF6347' },
  { name: 'Temperature', icon: { name: 'thermometer-half', type: 'font-awesome-5' }, color: '#FFD700' },
  { name: 'Sleep', icon: { name: 'bed', type: 'font-awesome' }, color: '#8A2BE2' },
  { name: 'ECG', icon: { name: 'heartbeat', type: 'font-awesome' }, color: '#B22222' },
  { name: 'Respiratory Rate', icon: { name: 'lungs', type: 'font-awesome-5' }, color: '#20B2AA' },
  { name: 'Fall Detection', icon: { name: 'exclamation-circle', type: 'font-awesome' }, color: '#DC143C' },
  { name: 'Blood Glucose', icon: { name: 'tint', type: 'font-awesome' }, color: '#32CD32' },
  { name: 'Hydration', icon: { name: 'bottle-water', type: 'font-awesome-5' }, color: '#1E90FF' },
  { name: 'Activity', icon: { name: 'running', type: 'font-awesome-5' }, color: '#FF4500' },
  { name: 'Cognitive', icon: { name: 'brain', type: 'font-awesome-5' }, color: '#9370DB' },
  { name: 'Gait & Posture', icon: { name: 'walking', type: 'font-awesome-5' }, color: '#808080' },
  { name: 'Environment', icon: { name: 'leaf', type: 'font-awesome-5' }, color: '#228B22' },
];

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 50,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    width: 120,
    height: 140,
    borderRadius: 15,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
    borderWidth: 2,
    padding: 10,
  },
  label: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
});

export default HealthMetrics;
