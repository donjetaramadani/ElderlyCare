const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Elderly Care Health Metrics API',
      version: '1.0.0',
      description: 'API documentation for Health Metrics endpoints',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Ensure this path is correct
};

const specs = swaggerJsdoc(options);
module.exports = specs; 