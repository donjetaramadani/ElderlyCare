using backendd.Core.Dtos;
using backendd.Core.Interfaces;
using backendd.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendd.Core.Services
{
    public class HealthDataFacade : IHealthDataFacade
    {
        private readonly IHealthMetricsService _healthMetrics;
        private readonly IRecommendationService _recommendations;
        private readonly IReminderService _reminders;

        public HealthDataFacade(
            IHealthMetricsService healthMetrics,
            IRecommendationService recommendations,
            IReminderService reminders)
        {
            _healthMetrics = healthMetrics;
            _recommendations = recommendations;
            _reminders = reminders;
        }

        public async Task<HealthDataDto> GetUnifiedHealthDataAsync(int userId)
        {
            var response = new HealthDataDto();

            try
            {
                var metricsTask = _healthMetrics.GetMetricsForUserAsync(userId);
                var recommendationsTask = _recommendations.GetAllRecommendationsAsync();
                var remindersTask = _reminders.GetAllRemindersAsync();

                await Task.WhenAll(metricsTask, recommendationsTask, remindersTask);

                response.HealthMetrics = metricsTask.Result ?? new List<HealthMetrics>();
                response.Recommendations = recommendationsTask.Result ?? new List<Recommendation>();
                response.Reminders = remindersTask.Result ?? new List<Reminder>();
            }
            catch (Exception ex)
            {
                response.Errors.Add($"Failed to retrieve complete health data: {ex.Message}");
                // Consider logging full exception here
            }

            return response;
        }
    }
}