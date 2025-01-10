const mongoose = require('mongoose');

// Clear any existing models
if (mongoose.models.HealthMetric) {
    delete mongoose.models.HealthMetric;
}

const healthMetricSchema = new mongoose.Schema({
    // Automatic ID field (_id) is created by MongoDB
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    
    // Heart Rate
    heartRate: {
        value: {
            type: Number,
            min: 40, // Minimum realistic heart rate
            max: 200, // Maximum realistic heart rate
            required: true // Make it required
        },
        unit: {
            type: String,
            default: 'bpm'
        },
        measuredAt: {
            type: Date,
            default: Date.now
        }
    },
    
    // Blood Pressure
    bloodPressure: {
        systolic: {
            type: Number,
            min: 50, // Minimum realistic systolic pressure
            max: 300, // Maximum realistic systolic pressure
            required: true // Make it required
        },
        diastolic: {
            type: Number,
            min: 30, // Minimum realistic diastolic pressure
            max: 200, // Maximum realistic diastolic pressure
            required: true // Make it required
        },
        unit: {
            type: String,
            default: 'mmHg'
        },
        measuredAt: {
            type: Date,
            default: Date.now
        }
    },
    
    // Oxygen Saturation
    oxygenSaturation: {
        value: {
            type: Number,
            min: 0,
            max: 100,
            required: true // Make it required
        },
        unit: {
            type: String,
            default: '%'
        },
        measuredAt: {
            type: Date,
            default: Date.now
        }
    },
    
    // General fields
    notes: {
        type: String,
        maxLength: 500
    },
    
    // Timestamps for the overall record
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    collection: 'healthmetrics'
});

// Indexes for better query performance
healthMetricSchema.index({ userId: 1, createdAt: -1 });
healthMetricSchema.index({ 'heartRate.measuredAt': 1 });
healthMetricSchema.index({ 'bloodPressure.measuredAt': 1 });
healthMetricSchema.index({ 'oxygenSaturation.measuredAt': 1 });

// Validation to ensure at least one metric is provided
healthMetricSchema.pre('save', function(next) {
    if (!this.heartRate.value && 
        !(this.bloodPressure.systolic || this.bloodPressure.diastolic) && 
        !this.oxygenSaturation.value) {
        next(new Error('At least one health metric must be provided'));
    }
    next();
});

// Virtual for formatted blood pressure
healthMetricSchema.virtual('bloodPressureFormatted').get(function() {
    if (this.bloodPressure.systolic && this.bloodPressure.diastolic) {
        return `${this.bloodPressure.systolic}/${this.bloodPressure.diastolic} ${this.bloodPressure.unit}`;
    }
    return null;
});

const HealthMetric = mongoose.model('HealthMetric', healthMetricSchema);

module.exports = HealthMetric; 