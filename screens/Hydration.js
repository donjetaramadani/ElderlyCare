import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { ProgressChart } from 'react-native-chart-kit'; // Example library for progress chart

const Hydration = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Hydration Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Today's Water Intake</Text>
        <Text style={styles.text}>
          <Text style={styles.highlight}>1.5 L</Text> / 2.5 L (Goal)
        </Text>
        <Text style={styles.text}>Last Updated: <Text style={styles.highlight}>1 hour ago</Text></Text>
      </View>

      {/* Progress Section */}
      <Text style={styles.subtitle}>Water Intake Progress</Text>
      <ProgressChart
        data={{
          labels: ['Water Intake'], 
          data: [0.6], // Progress towards the goal (1.5L out of 2.5L)
        }}
        width={320}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundGradientFrom: '#1E88E5',
          backgroundGradientTo: '#42A5F5',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          You're halfway to your hydration goal! Remember to keep sipping water throughout the day.
        </Text>
      </View>

      {/* Hydration Reminder Button */}
      <View style={[styles.card, styles.reminderCard]}>
        <Button
          title="Set Hydration Reminder"
          onPress={() => alert('Reminder set to drink water every hour!')}
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
    color: '#0288D1' 
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
    borderLeftColor: '#0288D1',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#42A5F5',
  },
  reminderCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#0288D1' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#42A5F5' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#0288D1' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default Hydration;
