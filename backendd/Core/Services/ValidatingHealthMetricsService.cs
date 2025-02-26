using backendd.Core.Interfaces;
using backendd.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class ValidatingHealthMetricsService : IHealthMetricsService
{
    private readonly IHealthMetricsService _metricsService;

    public ValidatingHealthMetricsService(IHealthMetricsService metricsService)
    {
        _metricsService = metricsService;
    }

    public async Task<List<HealthMetrics>> GetMetricsForUserAsync(int userId)
    {
        return await _metricsService.GetMetricsForUserAsync(userId)
            .ConfigureAwait(false);
    }

    public async Task<HealthMetrics?> GetMetricByIdAsync(int id)
    {
        return await _metricsService.GetMetricByIdAsync(id)
            .ConfigureAwait(false);
    }

    public async Task<HealthMetrics> AddOrUpdateMetricsAsync(HealthMetrics metrics)
    {
        ValidateMetrics(metrics);
        return await _metricsService.AddOrUpdateMetricsAsync(metrics)
            .ConfigureAwait(false);
    }

    public async Task<HealthMetrics?> UpdateMetricAsync(int id, HealthMetrics metrics)
    {
        ValidateMetrics(metrics);
        return await _metricsService.UpdateMetricAsync(id, metrics)
            .ConfigureAwait(false);
    }

    public async Task<bool> DeleteMetricsAsync(int id)
    {
        return await _metricsService.DeleteMetricsAsync(id)
            .ConfigureAwait(false);
    }

    private void ValidateMetrics(HealthMetrics metrics)
    {
        if (metrics == null)
            throw new ArgumentNullException(nameof(metrics));

        if (metrics.HeartRate is < 30 or > 200)
            throw new ArgumentOutOfRangeException(
                nameof(metrics.HeartRate),
                "Heart rate must be between 30-200 bpm");

        if (metrics.Steps < 0)
            throw new ArgumentOutOfRangeException(
                nameof(metrics.Steps),
                "Step count cannot be negative");

        if (metrics.Calories < 0)
            throw new ArgumentOutOfRangeException(
                nameof(metrics.Calories),
                "Calories burned cannot be negative");

        if (metrics.Timestamp > DateTime.UtcNow.AddMinutes(5))
            throw new ArgumentException(
                "Metrics timestamp cannot be in the future");
    }
}