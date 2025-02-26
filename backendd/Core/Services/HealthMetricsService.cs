using backendd.Core.DataAccess;
using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
        public async Task<List<HealthMetrics>> GetMetricsForUserAsync(int userId)
        {
            return await _context.HealthMetrics
                .Where(h => h.UserId == userId)
                .ToListAsync();
        }

        // Get a specific metric by ID
        public async Task<HealthMetrics> GetMetricByIdAsync(int id)
        {
            return await _context.HealthMetrics
                .FirstOrDefaultAsync(h => h.Id == id);
        }

        // Add or update metrics
        public async Task<HealthMetrics> AddOrUpdateMetricsAsync(HealthMetrics metrics)
        {
            if (metrics == null)
                throw new ArgumentNullException(nameof(metrics));

            var existingMetrics = await _context.HealthMetrics
                .FirstOrDefaultAsync(h => h.Id == metrics.Id);

            if (existingMetrics != null)
            {
                // Update existing metrics
                existingMetrics.HeartRate = metrics.HeartRate;
                existingMetrics.Steps = metrics.Steps;
                existingMetrics.Calories = metrics.Calories;
                existingMetrics.Timestamp = metrics.Timestamp;
            }
            else
            {
                // Add new metrics
                await _context.HealthMetrics.AddAsync(metrics);
            }

            await _context.SaveChangesAsync();
            return existingMetrics ?? metrics;
        }


        // Update metrics by ID
        public async Task<HealthMetrics> UpdateMetricAsync(int id, HealthMetrics updatedMetrics)
        {
            var existingMetric = await _context.HealthMetrics
                .FirstOrDefaultAsync(h => h.Id == id);

            if (existingMetric == null)
                return null;

            existingMetric.HeartRate = updatedMetrics.HeartRate;
            existingMetric.Steps = updatedMetrics.Steps;
            existingMetric.Calories = updatedMetrics.Calories;
            existingMetric.Timestamp = updatedMetrics.Timestamp;

            await _context.SaveChangesAsync();
            return existingMetric;
        }

        // Delete metrics by ID
        public async Task<bool> DeleteMetricsAsync(int id)
        {
            var metrics = await _context.HealthMetrics
                .FirstOrDefaultAsync(h => h.Id == id);

            if (metrics == null)
                return false;

            _context.HealthMetrics.Remove(metrics);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
