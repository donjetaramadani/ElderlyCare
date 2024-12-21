import axios from 'axios';
import https from 'https';

// If the backend uses a self-signed certificate
const httpsAgent = new https.Agent({
  rejectUnauthorized: false  // In development, use this for self-signed certificates
});

const axiosClient = axios.create({
  baseURL: 'https://192.168.0.42:7016', // Replace with your actual backend URL
  httpsAgent
});

export default axiosClient;
