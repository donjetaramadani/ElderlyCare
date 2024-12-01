import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for charts

const RespiratoryRate = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Respiratory Rate</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Current Respiratory Rate</Text>
        <Text style={styles.text}>Rate: <Text style={styles.highlight}>18 breaths/min</Text></Text>
        <Text style={styles.text}>Status: <Text style={styles.highlight}>Normal</Text></Text>
        <Text style={styles.text}>Last Updated: <Text style={styles.highlight}>5 mins ago</Text></Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Respiratory Rate Trends (Last 7 Days)</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [18, 19, 18, 17, 18, 19, 18] }],
        }}
        width={320}
        height={220}
        yAxisSuffix=" bpm"
        chartConfig={{
          backgroundGradientFrom: '#0288d1',
          backgroundGradientTo: '#81d4fa',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2, // Makes the line look sharp
        }}
        bezier
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          🌬️ Your respiratory rate is stable and within normal limits. Keep up the good work with your breathing exercises!
        </Text>
      </View>

      {/* Connect Device */}
      <View style={[styles.card, styles.deviceCard]}>
        <Button
          title="Sync Respiratory Monitor"
          color="#0288d1"
          onPress={() => alert('Sync your device to get the latest respiratory data!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#e3f2fd' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#0288d1' 
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
    borderLeftColor: '#0288d1',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#81d4fa',
  },
  deviceCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#0288d1' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#81d4fa' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#0288d1' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default RespiratoryRate;
