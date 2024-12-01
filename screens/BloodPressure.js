import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for charts

const BloodPressure = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Blood Pressure Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Today's Reading</Text>
        <Text style={styles.text}>Systolic: <Text style={styles.highlight}>120 mmHg</Text></Text>
        <Text style={styles.text}>Diastolic: <Text style={styles.highlight}>80 mmHg</Text></Text>
        <Text style={styles.text}>Pulse: <Text style={styles.highlight}>72 BPM</Text></Text>
        <Text style={styles.text}>Status: <Text style={styles.highlight}>Normal</Text></Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Weekly Blood Pressure Trends</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            { data: [120, 122, 125, 118, 117, 121, 120], color: () => '#FF6F61' }, // Systolic
            { data: [80, 82, 79, 81, 78, 80, 79], color: () => '#61B2FF' }, // Diastolic
          ],
          legend: ['Systolic', 'Diastolic'],
        }}
        width={320}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: '#fcb045',
          backgroundGradientTo: '#fd1d1d',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2,
        }}
        bezier
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          🩺 Your blood pressure has been steady this week. Keep maintaining a balanced diet and regular exercise to stay healthy!
        </Text>
      </View>

      {/* Connect Device */}
      <View style={[styles.card, styles.deviceCard]}>
        <Button
          title="Sync Wearable Device"
          color="#FF6F61"
          onPress={() => alert('Sync your device for the latest updates!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#fff5f5' 
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
    borderLeftColor: '#FF6F61',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#fcb045',
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
    color: '#FF6F61' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default BloodPressure;
