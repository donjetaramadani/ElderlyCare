const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HealthMetric = require('../models/HealthMetric');
const { authenticateJWT } = require('./auth'); // Import the JWT middleware

// Protect all health metrics routes
router.use(authenticateJWT);

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/**
 * @swagger
 * components:
 *   schemas:
 *     HealthMetric:
 *       type: object
 *       required:
 *         - userId
 *       properties:
 *         userId:
 *           type: string
 *           description: The user ID
 *         heartRate:
 *           type: object
 *           properties:
 *             value:
 *               type: number
 *               description: Heart rate value
 *             unit:
 *               type: string
 *               default: bpm
 *         bloodPressure:
 *           type: object
 *           properties:
 *             systolic:
 *               type: number
 *               description: Systolic pressure
 *             diastolic:
 *               type: number
 *               description: Diastolic pressure
 *         oxygenSaturation:
 *           type: object
 *           properties:
 *             value:
 *               type: number
 *               description: Oxygen saturation level
 *             unit:
 *               type: string
 *               default: '%'
 *         notes:
 *           type: string
 *           description: Additional notes
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the metrics were recorded
 *       example:
 *         userId: "65f1234567890abcdef12345"
 *         heartRate:
 *           value: 75
 *         bloodPressure:
 *           systolic: 120
 *           diastolic: 80
 *         oxygenSaturation:
 *           value: 98
 *         notes: "Regular checkup"
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /health-metrics:
 *   post:
 *     summary: Create a new health metric
 *     tags: [Health Metrics]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthMetric'
 *     responses:
 *       201:
 *         description: The created health metric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthMetric'
 */

/**
 * @swagger
 * /health-metrics:
 *   get:
 *     summary: Get all health metrics
 *     tags: [Health Metrics]
 *     responses:
 *       200:
 *         description: List of health metrics
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HealthMetric'
 */

// POST route - Create new health metric
router.post('/', async (req, res) => {
  try {
    // Validate heart rate
    if (req.body.heartRate) {
      if (req.body.heartRate.value < 40 || req.body.heartRate.value > 200) {
        return res.status(400).json({ message: 'Heart rate must be between 40 and 200 bpm.' });
      }
    } else {
      return res.status(400).json({ message: 'Heart rate is required.' });
    }

    // Validate blood pressure
    if (req.body.bloodPressure) {
      if (req.body.bloodPressure.systolic < 50 || req.body.bloodPressure.systolic > 300) {
        return res.status(400).json({ message: 'Systolic blood pressure must be between 50 and 300 mmHg.' });
      }
      if (req.body.bloodPressure.diastolic < 30 || req.body.bloodPressure.diastolic > 200) {
        return res.status(400).json({ message: 'Diastolic blood pressure must be between 30 and 200 mmHg.' });
      }
    } else {
      return res.status(400).json({ message: 'Blood pressure is required.' });
    }

    // Validate oxygen saturation
    if (req.body.oxygenSaturation) {
      if (req.body.oxygenSaturation.value < 0 || req.body.oxygenSaturation.value > 100) {
        return res.status(400).json({ message: 'Oxygen saturation must be between 0 and 100%.' });
      }
    } else {
      return res.status(400).json({ message: 'Oxygen saturation is required.' });
    }

    const metric = new HealthMetric(req.body);
    const newMetric = await metric.save();
    res.status(201).json(newMetric);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /health-metrics/{id}:
 *   get:
 *     summary: Get a health metric by ID
 *     tags: [Health Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The health metric ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The health metric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthMetric'
 *       404:
 *         description: Metric not found
 */

// GET route - Get all metrics
router.get('/', async (req, res) => {
  try {
    const metrics = await HealthMetric.find();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /health-metrics/{id}:
 *   get:
 *     summary: Get a health metric by ID
 *     tags: [Health Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The health metric ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The health metric
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthMetric'
 *       404:
 *         description: Metric not found
 */

// GET route - Get specific metric
router.get('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const metric = await HealthMetric.findById(req.params.id);
    if (metric) {
      res.json(metric);
    } else {
      res.status(404).json({ message: 'Metric not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /health-metrics/{id}:
 *   put:
 *     summary: Update a health metric by ID
 *     tags: [Health Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The health metric ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HealthMetric'
 *     responses:
 *       200:
 *         description: The updated health metric
 *       404:
 *         description: Metric not found
 */

// PUT route - Update metric
router.put('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const updateData = {
      heartRate: req.body.heartRate,
      bloodPressure: req.body.bloodPressure,
      oxygenSaturation: req.body.oxygenSaturation,
      temperature: req.body.temperature,
      bloodSugar: req.body.bloodSugar,
      weight: req.body.weight,
      steps: req.body.steps,
      notes: req.body.notes
    };

    const metric = await HealthMetric.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (metric) {
      res.json(metric);
    } else {
      res.status(404).json({ message: 'Metric not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /health-metrics/{id}:
 *   delete:
 *     summary: Delete a health metric by ID
 *     tags: [Health Metrics]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The health metric ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Metric deleted successfully
 *       404:
 *         description: Metric not found
 */

// DELETE route
router.delete('/:id', async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    
    const metric = await HealthMetric.findById(req.params.id);
    if (metric) {
      await HealthMetric.findByIdAndDelete(req.params.id);
      res.json({ message: 'Metric deleted' });
    } else {
      res.status(404).json({ message: 'Metric not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 