import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for graphs
import { useHealthData } from './HealthDataContext';

const Activity = () => {

  const { activityData, isLoading, error} = useHealthData();


  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Activity Data...</Text>
      </View>
    );
  }

  if (error) {
    console.error("Error loading activity data:", error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading activity data. Please try again later.</Text>
      </View>
    );
  }

  if (!activityData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: Unable to load activity data</Text>
      </View>
    );
  } 
  const { activeTime, type: activityType, calories, weeklyTrend, goal } = activityData;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Activity Tracker</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Today's Activity</Text>
        <Text style={styles.text}>
          <Text style={styles.highlight}>{activeTime || 0} mins</Text> of active time
        </Text>
        <Text style={styles.text}>Activity Type: <Text style={styles.highlight}>{activityType || 'N/A'}</Text></Text>
        <Text style={styles.text}>Calories Burned: <Text style={styles.highlight}>{calories || 0} kcal</Text></Text>
        <Text style={styles.text}>Goal: <Text style={styles.highlight}>{goal || 60} hour</Text></Text>
      </View>

      {/* Activity Trend Section */}
      <Text style={styles.subtitle}>Weekly Activity Trend</Text>
      <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{ data: weeklyTrend || [0, 0, 0, 0, 0, 0, 0] }],
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
        {activeTime >= goal
            ? "Great work! You've reached your goal today. Keep it up!"
            : `You're ${goal - activeTime} mins away from your daily goal. Stay active!`}
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
