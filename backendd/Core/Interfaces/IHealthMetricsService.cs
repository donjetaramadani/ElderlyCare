using backendd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendd.Core.Interfaces
{
    public interface IHealthMetricsService
    {
        Task<List<HealthMetrics>> GetMetricsForUserAsync(int userId);
        Task<HealthMetrics?> GetMetricByIdAsync(int id);
        Task<HealthMetrics> AddOrUpdateMetricsAsync(HealthMetrics metrics);
        Task<HealthMetrics?> UpdateMetricAsync(int id, HealthMetrics metrics);
        Task<bool> DeleteMetricsAsync(int id);
    }
}