import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Change this to your server URL

const healthMetricsService = {
  // Get all health metrics
  getAllMetrics: async () => {
    try {
      const response = await axios.get(`${API_URL}/health-metrics`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Add new health metric
  addMetric: async (metricData) => {
    try {
      const response = await axios.post(`${API_URL}/health-metrics`, metricData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Get specific metric
  getMetricById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/health-metrics/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Update metric
  updateMetric: async (id, metricData) => {
    try {
      const response = await axios.put(`${API_URL}/health-metrics/${id}`, metricData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  // Delete metric
  deleteMetric: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/health-metrics/${id}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
};

export default healthMetricsService; 