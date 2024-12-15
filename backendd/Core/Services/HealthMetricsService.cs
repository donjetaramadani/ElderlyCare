using backendd.Core.DataAccess;
using backendd.Core.Interfaces;
using backendd.Models;
using System.Collections.Generic;
using System.Linq;

namespace backendd.Core.Services
{
    public class HealthMetricsService : IHealthMetricsService
    {
        private readonly ApplicationDbContext _context;

        public HealthMetricsService(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get all metrics for a specific user
        public List<HealthMetrics> GetMetricsForUser(int userId) =>
            _context.HealthMetrics.Where(h => h.UserId == userId).ToList();

        // Get a specific metric by ID
        public HealthMetrics GetMetricById(int id) =>
            _context.HealthMetrics.FirstOrDefault(h => h.Id == id);

        // Add or update metrics
        public HealthMetrics AddOrUpdateMetrics(HealthMetrics metrics)
        {
            var existingMetrics = _context.HealthMetrics.FirstOrDefault(h => h.Id == metrics.Id);
            if (existingMetrics != null)
            {
                existingMetrics.HeartRate = metrics.HeartRate;
                existingMetrics.Steps = metrics.Steps;
                existingMetrics.Calories = metrics.Calories;
                existingMetrics.Timestamp = metrics.Timestamp;
            }
            else
            {
                _context.HealthMetrics.Add(metrics);
            }

            _context.SaveChanges();
            return metrics;
        }

        // Update metrics by ID
        public HealthMetrics UpdateMetric(int id, HealthMetrics updatedMetrics)
        {
            var existingMetrics = _context.HealthMetrics.FirstOrDefault(h => h.Id == id);
            if (existingMetrics == null)
                return null;

            existingMetrics.HeartRate = updatedMetrics.HeartRate;
            existingMetrics.Steps = updatedMetrics.Steps;
            existingMetrics.Calories = updatedMetrics.Calories;
            existingMetrics.Timestamp = updatedMetrics.Timestamp;

            _context.SaveChanges();
            return existingMetrics;
        }

        // Delete metrics by ID
        public bool DeleteMetrics(int id)
        {
            var metrics = _context.HealthMetrics.FirstOrDefault(h => h.Id == id);
            if (metrics == null) return false;

            _context.HealthMetrics.Remove(metrics);
            _context.SaveChanges();
            return true;
        }
    }
}
