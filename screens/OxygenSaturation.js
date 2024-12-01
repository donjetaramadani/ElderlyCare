import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit'; // Example library for charts

const OxygenSaturation = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Oxygen Saturation Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Current SpO₂: <Text style={styles.highlight}>98%</Text></Text>
        <Text style={styles.text}>Status: <Text style={styles.highlight}>Normal</Text></Text>
        <Text style={styles.text}>Last Reading: <Text style={styles.highlight}>5 mins ago</Text></Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Weekly Oxygen Saturation Trends</Text>
      <ProgressChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: [0.98, 0.97, 0.99, 0.98, 0.96, 0.97, 0.98],
        }}
        width={320}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundGradientFrom: '#4caf50',
          backgroundGradientTo: '#81c784',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          🌿 Your oxygen levels are excellent this week. Regular breathing exercises and staying active contribute to maintaining healthy SpO₂ levels.
        </Text>
      </View>

      {/* Connect Device */}
      <View style={[styles.card, styles.deviceCard]}>
        <Button
          title="Sync Wearable Device"
          color="#4caf50"
          onPress={() => alert('Sync your device for the latest updates!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#f3fff3' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#2e7d32' 
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
    borderLeftColor: '#4caf50',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#81c784',
  },
  deviceCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#1b5e20' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#2e7d32' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#4caf50' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default OxygenSaturation;
