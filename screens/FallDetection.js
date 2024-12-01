import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for charts

const FallDetection = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Fall Detection</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Fall Status</Text>
        <Text style={styles.text}>Last Detected: <Text style={styles.highlight}>No Fall Detected</Text></Text>
        <Text style={styles.text}>Status: <Text style={styles.highlight}>Safe</Text></Text>
        <Text style={styles.text}>Last Checked: <Text style={styles.highlight}>10 minutes ago</Text></Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Fall Detection Activity (Last 7 Days)</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [0, 0, 1, 0, 0, 0, 0] }],
        }}
        width={320}
        height={220}
        yAxisSuffix=" Falls"
        chartConfig={{
          backgroundGradientFrom: '#FF7043',
          backgroundGradientTo: '#FFAB91',
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
          🛑 No falls detected this week. Keep moving safely, and stay cautious of your surroundings.
        </Text>
      </View>

      {/* Emergency Button */}
      <View style={[styles.card, styles.emergencyCard]}>
        <Button
          title="Alert Emergency Contacts"
          color="#FF7043"
          onPress={() => alert('Sending alert to your emergency contacts!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#ffebee' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#FF7043' 
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
    borderLeftColor: '#FF7043',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FFAB91',
  },
  emergencyCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#FF7043' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#FFAB91' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#FF7043' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default FallDetection;
