using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using backendd.Models;
using backendd.Core.Services;
using backendd.Core.Interfaces;

namespace backendd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomepageController : ControllerBase
    {
        private readonly IHealthMetricsService _healthMetricsService;

        public HomepageController(IHealthMetricsService healthMetricsService)
        {
            _healthMetricsService = healthMetricsService;
        }

        // Get metrics by user ID
        [HttpGet("health-metrics")]
        public IActionResult GetHealthMetrics(int userId)
        {
            var metrics = _healthMetricsService.GetMetricsForUser(userId);
            return metrics != null ? Ok(metrics) : NotFound();
        }

        // Add or update metrics
        [HttpPost("health-metrics")]
        public IActionResult AddOrUpdateHealthMetrics([FromBody] HealthMetrics newMetrics)
        {
            if (newMetrics == null)
                return BadRequest("Health metrics cannot be null.");

            var result = _healthMetricsService.AddOrUpdateMetrics(newMetrics);
            return Ok(result);
        }

        // Get metrics by ID
        [HttpGet("health-metrics/{id}")]
        public IActionResult GetHealthMetricsById(int id)
        {
            var metric = _healthMetricsService.GetMetricById(id);
            return metric != null ? Ok(metric) : NotFound();
        }

        // Update metrics by ID
        [HttpPut("health-metrics/{id}")]
        public IActionResult UpdateHealthMetrics(int id, [FromBody] HealthMetrics updatedMetrics)
        {
            if (updatedMetrics == null)
                return BadRequest("Updated metrics cannot be null.");

            var result = _healthMetricsService.UpdateMetric(id, updatedMetrics);
            return result != null ? Ok(result) : NotFound($"Metric with ID {id} not found.");
        }

        // Delete metrics by ID
        [HttpDelete("health-metrics/{id}")]
        public IActionResult DeleteHealthMetrics(int id)
        {
            var success = _healthMetricsService.DeleteMetrics(id);
            return success ? NoContent() : NotFound($"Metric with ID {id} not found.");
        }
    }
}
