const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger');
const authRoutes = require('./routes/auth');
const healthMetricsRouter = require('./routes/healthMetrics');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Authentication routes
app.use('/auth', authRoutes.router);

// MongoDB connection
mongoose.connect('mongodb://your_username:your_password@localhost:27017/elderlycare', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'elderlycare'
});

// Routes
app.use('/health-metrics', healthMetricsRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 