import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const HeartHealth = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <Text style={styles.header}>Heart Health</Text>

      {/* Summary Section */}
      <View style={styles.card}>
        <Text style={styles.title}>Current Heart Rate: <Text style={styles.highlight}>75 BPM</Text></Text>
        <Text style={styles.status}>Status: <Text style={styles.normalStatus}>Normal</Text></Text>
        <Text style={styles.updated}>Last Updated: 10 mins ago</Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Heart Rate Trends</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [{ data: [72, 74, 70, 76, 73] }],
          }}
          width={screenWidth - 40}
          height={220}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#FFF',
            backgroundGradientFrom: '#3b8beb',
            backgroundGradientTo: '#4c98f7',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            propsForDots: {
              r: '5',
              strokeWidth: '2',
              stroke: '#3b8beb',
            },
          }}
          bezier
          style={styles.chart}
        />
      </View>

      {/* Insights Section */}
      <View style={styles.card}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          Your heart rate has been stable this week. Keep up the good work with regular exercise and a balanced diet!
        </Text>
      </View>

      {/* Connect Device Section */}
      <View style={styles.card}>
        <Button
          title="Connect Wearable Device"
          onPress={() => alert('Connect your device!')}
          color="#3b8beb"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#f0f4f7' },
  header: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 20, color: '#3b8beb' },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
  highlight: { color: '#3b8beb', fontWeight: 'bold' },
  status: { fontSize: 16, marginVertical: 5 },
  normalStatus: { color: 'green', fontWeight: 'bold' },
  updated: { fontSize: 14, color: '#888' },
  subtitle: { fontSize: 18, fontWeight: '600', marginVertical: 10 },
  chartContainer: { marginBottom: 20 },
  chart: { borderRadius: 15 },
  text: { fontSize: 16, lineHeight: 22, color: '#333', marginTop: 5 },
});

export default HeartHealth;
