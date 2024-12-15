using backendd.Models;
using System.Collections.Generic;

namespace backendd.Core.Interfaces
{
    public interface IHealthMetricsService
    {
        List<HealthMetrics> GetMetricsForUser(int userId);
        HealthMetrics GetMetricById(int id);
        HealthMetrics AddOrUpdateMetrics(HealthMetrics metrics);
        HealthMetrics UpdateMetric(int id, HealthMetrics metrics);
        bool DeleteMetrics(int id);
    }
}
