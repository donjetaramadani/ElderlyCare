import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Example library for charts

const Sleep = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Sleep Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Last Night's Sleep: <Text style={styles.highlight}>7h 45m</Text></Text>
        <Text style={styles.text}>Sleep Quality: <Text style={styles.highlight}>Good</Text></Text>
        <Text style={styles.text}>Goal: <Text style={styles.highlight}>8h per night</Text></Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Weekly Sleep Patterns</Text>
      <BarChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [6.5, 7.0, 7.5, 8.0, 7.8, 8.2, 7.7] }],
        }}
        width={320}
        height={220}
        yAxisSuffix="h"
        chartConfig={{
          backgroundGradientFrom: '#6a1b9a',
          backgroundGradientTo: '#ab47bc',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          🌙 You've been consistent with your sleep schedule this week. Try winding down earlier to meet your goal of 8 hours each night.
        </Text>
      </View>

      {/* Connect Device */}
      <View style={[styles.card, styles.deviceCard]}>
        <Button
          title="Sync Sleep Data"
          color="#6a1b9a"
          onPress={() => alert('Sync your device to get the latest sleep data!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#f9f3fc' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#4a0072' 
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
    borderLeftColor: '#6a1b9a',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ab47bc',
  },
  deviceCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#4a0072' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#6a1b9a' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#ab47bc' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default Sleep;
