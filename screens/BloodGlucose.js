import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for charts

const BloodGlucose = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Blood Glucose Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Current Blood Glucose Level</Text>
        <Text style={styles.text}>
          <Text style={styles.highlight}>98 mg/dL</Text> (Normal)
        </Text>
        <Text style={styles.text}>Last Checked: <Text style={styles.highlight}>30 minutes ago</Text></Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Blood Glucose Trends (Last 7 Days)</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              data: [95, 98, 110, 105, 99, 96, 101],
            },
          ],
        }}
        width={320}
        height={220}
        yAxisLabel="mg/dL"
        chartConfig={{
          backgroundGradientFrom: '#4CAF50',
          backgroundGradientTo: '#81C784',
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
          Your blood glucose levels are stable and within the normal range. Keep up with a balanced diet and regular exercise to maintain healthy levels.
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
    backgroundColor: '#e8f5e9' 
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
    borderLeftColor: '#388E3C',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#81C784',
  },
  emergencyCard: {
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
    color: '#81C784' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#388E3C' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default BloodGlucose;
