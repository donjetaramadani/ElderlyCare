import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit'; // Example library for charts

const ECG = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>ECG Monitor</Text>

      {/* Summary Section */}
      <View style={[styles.card, styles.summaryCard]}>
        <Text style={styles.title}>Last ECG Reading</Text>
        <Text style={styles.text}>Status: <Text style={styles.highlight}>Normal</Text></Text>
        <Text style={styles.text}>Date: <Text style={styles.highlight}>Nov 29, 2024</Text></Text>
        <Text style={styles.text}>Time: <Text style={styles.highlight}>10:45 AM</Text></Text>
      </View>

      {/* Chart Section */}
      <Text style={styles.subtitle}>Recent ECG Graph</Text>
      <LineChart
        data={{
          labels: ['0s', '1s', '2s', '3s', '4s'],
          datasets: [{ data: [0, 3, 0, -3, 0] }], // Example ECG data
        }}
        width={320}
        height={220}
        yAxisSuffix="mV"
        chartConfig={{
          backgroundGradientFrom: '#004d40',
          backgroundGradientTo: '#26a69a',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          strokeWidth: 2, // Makes the ECG line look crisp
        }}
        bezier
        style={styles.chart}
      />

      {/* Insights */}
      <View style={[styles.card, styles.insightCard]}>
        <Text style={styles.subtitle}>Insights</Text>
        <Text style={styles.text}>
          ❤️ Your heart's electrical activity looks normal. No irregularities detected in the latest reading.
        </Text>
      </View>

      {/* Connect Device */}
      <View style={[styles.card, styles.deviceCard]}>
        <Button
          title="Sync ECG Device"
          color="#004d40"
          onPress={() => alert('Sync your device to get the latest ECG data!')}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    backgroundColor: '#e0f2f1' 
  },
  header: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    color: '#004d40' 
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
    borderLeftColor: '#004d40',
  },
  insightCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#26a69a',
  },
  deviceCard: {
    alignItems: 'center',
  },
  title: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    color: '#004d40' 
  },
  subtitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginVertical: 15, 
    color: '#26a69a' 
  },
  text: { 
    fontSize: 16, 
    marginVertical: 2, 
    color: '#6d6d6d' 
  },
  highlight: { 
    fontWeight: 'bold', 
    color: '#26a69a' 
  },
  chart: { 
    marginVertical: 20, 
    borderRadius: 15, 
    alignSelf: 'center' 
  },
});

export default ECG;
