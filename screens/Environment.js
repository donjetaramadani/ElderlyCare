import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { BarChart } from 'react-native-chart-kit'; // Example library for charts

const Environment = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Environment Monitoring</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Current Conditions</Text>
        <Text style={styles.text}>Temperature: <Text style={styles.highlight}>22°C</Text></Text>
        <Text style={styles.text}>Air Quality Index (AQI): <Text style={styles.highlight}>45 (Good)</Text></Text>
        <Text style={styles.text}>Humidity: <Text style={styles.highlight}>55%</Text></Text>
        <Text style={styles.text}>Noise Level: <Text style={styles.highlight}>35 dB (Quiet)</Text></Text>
      </View>

      {/* Trend Section */}
      <Text style={styles.subtitle}>Weekly Air Quality Trend</Text>
      <BarChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [50, 48, 52, 47, 45, 49, 43] }],
        }}
        width={320}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: '#FFF',
          backgroundGradientFrom: '#4CAF50',
          backgroundGradientTo: '#81C784',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Insights Section */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          Air quality has been consistently good this week. Keep your windows open for fresh air!
        </Text>
      </View>

      {/* Button Section */}
      <View style={[styles.card, styles.actionCard]}>
        <Button
          title="View Detailed Report"
          onPress={() => alert('Opening detailed environment report!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#E8F5E9' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#388E3C' 
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
    borderLeftColor: '#4CAF50',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
  },
  actionCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#388E3C' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#66BB6A' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#4CAF50' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default Environment;
