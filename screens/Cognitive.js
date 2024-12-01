import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for graphs

const Cognitive = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Cognitive Health Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Today's Cognitive Activity</Text>
        <Text style={styles.text}>
          <Text style={styles.highlight}>Memory Test</Text> completed
        </Text>
        <Text style={styles.text}>Score: <Text style={styles.highlight}>85%</Text></Text>
        <Text style={styles.text}>Goal: <Text style={styles.highlight}>90%</Text></Text>
        <Text style={styles.text}>Last Update: <Text style={styles.highlight}>Just now</Text></Text>
      </View>

      {/* Cognitive Performance Trend Section */}
      <Text style={styles.subtitle}>Weekly Cognitive Performance</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: [75, 80, 82, 84, 86, 87, 85] }],
        }}
        width={320}
        height={220}
        yAxisLabel="%"
        chartConfig={{
          backgroundColor: '#FFF',
          backgroundGradientFrom: '#9C27B0', // Purple shades
          backgroundGradientTo: '#BA68C8', // Lighter purple
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          Great work! Your cognitive performance is improving. Aim for higher scores to enhance mental sharpness.
        </Text>
      </View>

      {/* Start Cognitive Activity Button */}
      <View style={[styles.card, styles.startActivityCard]}>
        <Button
          title="Start New Cognitive Activity"
          onPress={() => alert('Activity started!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#F3E5F5' // Light purple background
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#9C27B0' // Purple header color
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
    borderLeftColor: '#9C27B0', // Purple left border
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#BA68C8', // Lighter purple left border
  },
  startActivityCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#9C27B0' // Purple title
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#BA68C8' // Lighter purple subtitle
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#9C27B0' // Purple highlight
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default Cognitive;
