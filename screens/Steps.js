import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Example library for charts
import { useHealthData } from './HealthDataContext';

const Steps = () => {

  const { healthData, updateHealthData } = useHealthData();

  const handleSyncDevice = () => {
    // Example function to sync device (simulate step count update)
    updateHealthData("steps", healthData.steps + 500); // Simulates adding 500 steps
    alert("Device synced successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Steps Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Today's Steps: <Text style={styles.highlight}>{healthData.steps}</Text></Text>
        <Text style={styles.text}>Status: <Text style={styles.highlight}> {healthData.steps >= 10000 ? "Goal Achieved!" : "Almost There!"}</Text></Text>
        <Text style={styles.text}>Goal: <Text style={styles.highlight}>10,000 steps</Text></Text>
        <Text style={styles.text}>Calories Burned: <Text style={styles.highlight}>{(healthData.steps * 0.04).toFixed(0)} kcal</Text></Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Weekly Steps Progress</Text>
      <BarChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [4000, 7000, 5000, 8000, 10000, 9500, healthData.steps] }],
        }}
        width={320}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#6b8e23',
          backgroundGradientTo: '#a2ff99',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          barPercentage: 0.7,
        }}
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          🌟 Great job this week! Your step count has been consistent. 
          Keep up the momentum and hit your daily goals! 💪
        </Text>
      </View>

      {/* Connect Device */}
      <View style={[styles.card, styles.deviceCard]}>
        <Button
          title="Sync Wearable Device"
          color="#1E90FF"
          onPress={() => alert('Sync your device for the latest updates!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#f0f8ff' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#2c3e50' 
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
  summaryCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#1E90FF',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#6b8e23',
  },
  deviceCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#34495e' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#2c3e50' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#7f8c8d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#1E90FF' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default Steps;
