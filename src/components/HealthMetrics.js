import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import healthMetricsService from '../services/healthMetricsService';

const HealthMetrics = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const data = await healthMetricsService.getAllMetrics();
      setMetrics(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch health metrics');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const renderMetric = (metric) => {
    return (
      <View key={metric._id} style={styles.metricCard}>
        <Text style={styles.metricType}>{metric.type}</Text>
        <Text style={styles.metricValue}>{metric.value}</Text>
        <Text style={styles.metricTimestamp}>
          {new Date(metric.timestamp).toLocaleString()}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>{error}</Text>
        <TouchableOpacity onPress={fetchMetrics} style={styles.retryButton}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Health Metrics</Text>
      {metrics.map(renderMetric)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  metricCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  metricType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  metricValue: {
    fontSize: 24,
    color: '#007AFF',
    marginVertical: 8,
  },
  metricTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HealthMetrics; 