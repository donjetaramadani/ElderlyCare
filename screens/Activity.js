import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for graphs

const Activity = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Activity Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Today's Activity</Text>
        <Text style={styles.text}>
          <Text style={styles.highlight}>45 mins</Text> of active time
        </Text>
        <Text style={styles.text}>Activity Type: <Text style={styles.highlight}>Walking</Text></Text>
        <Text style={styles.text}>Calories Burned: <Text style={styles.highlight}>250 kcal</Text></Text>
        <Text style={styles.text}>Goal: <Text style={styles.highlight}>1 hour</Text></Text>
      </View>

      {/* Activity Trend Section */}
      <Text style={styles.subtitle}>Weekly Activity Trend</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [30, 45, 50, 40, 60, 55, 70] }],
        }}
        width={320}
        height={220}
        yAxisLabel="min"
        chartConfig={{
          backgroundColor: '#FFF',
          backgroundGradientFrom: '#FF5722',
          backgroundGradientTo: '#FF7043',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          Great progress! You're on track to meet your weekly activity goals. Keep moving!
        </Text>
      </View>

      {/* Start Activity Button */}
      <View style={[styles.card, styles.startActivityCard]}>
        <Button
          title="Start New Activity"
          onPress={() => alert('Activity started!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#FFEBEE' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#FF5722' 
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
    borderLeftColor: '#FF5722',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF7043',
  },
  startActivityCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#FF5722' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#FF7043' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#FF5722' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default Activity;
