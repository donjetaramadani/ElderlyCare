const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HealthMetric = require('../models/HealthMetric');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST route - Create new health metric
router.post('/', async (req, res) => {
  try {
    if (!isValidObjectId(req.body.userId)) {
      return res.status(400).json({ 
        message: 'Invalid userId format. Must be a valid MongoDB ObjectId.'
      });
    }

    const metric = new HealthMetric({
      userId: req.body.userId,
      heartRate: req.body.heartRate,
      bloodPressure: req.body.bloodPressure,
      oxygenSaturation: req.body.oxygenSaturation,
      temperature: req.body.temperature,
      bloodSugar: req.body.bloodSugar,
      weight: req.body.weight,
      steps: req.body.steps,
      notes: req.body.notes
    });

    const newMetric = await metric.save();
    res.status(201).json(newMetric);
  } catch (error) {
    res.status(400).json({ 
      message: error.message,
      example: {
        userId: "65f1234567890abcdef12345",
        heartRate: {
          value: 75
        },
        bloodPressure: {
          systolic: 120,
          diastolic: 80
        },
        oxygenSaturation: {
          value: 98
        }
      }
    });
  }
});

// GET route - Get all metrics
router.get('/', async (req, res) => {
  try {
    const metrics = await HealthMetric.find();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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