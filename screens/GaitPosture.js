import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for graphs

const GaitPosture = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Gait & Posture Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Today's Gait & Posture</Text>
        <Text style={styles.text}>Posture Status: <Text style={styles.highlight}>Good</Text></Text>
        <Text style={styles.text}>Gait Speed: <Text style={styles.highlight}>1.2 m/s</Text></Text>
        <Text style={styles.text}>Last Update: <Text style={styles.highlight}>Just now</Text></Text>
      </View>

      {/* Gait Speed Trend Section */}
      <Text style={styles.subtitle}>Gait Speed Trend (Weekly)</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [1.0, 1.1, 1.3, 1.2, 1.4, 1.2, 1.3] }],
        }}
        width={320}
        height={220}
        yAxisLabel="m/s"
        chartConfig={{
          backgroundColor: '#FFF',
          backgroundGradientFrom: '#D3D3D3', // Light gray shades
          backgroundGradientTo: '#A9A9A9', // Medium gray
          color: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(80, 80, 80, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Posture Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Posture Insights</Text>
        <Text style={styles.text}>
          Keep maintaining your good posture to avoid future discomfort. Consistent gait speed is key to healthy mobility.
        </Text>
      </View>

      {/* Start Gait & Posture Activity Button */}
      <View style={[styles.card, styles.startActivityCard]}>
        <Button
          title="Start Gait & Posture Activity"
          color="#696969" // Dark gray button color
          onPress={() => alert('Activity started!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#F5F5F5' // Light gray background
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#2F4F4F' // Dark slate gray for the header
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    borderLeftColor: '#696969', // Dark gray left border
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#A9A9A9', // Medium gray left border
  },
  startActivityCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#2F4F4F' // Dark slate gray for the title
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#696969' // Dark gray for subtitles
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#4F4F4F' // Dim gray for text
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#696969' // Dark gray for highlights
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default GaitPosture;
