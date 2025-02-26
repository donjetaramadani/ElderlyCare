using backendd.Core.Interfaces;
using backendd.Core.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backendd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomepageController : ControllerBase
    {
        private readonly IHealthMetricsService _healthMetricsService;
        private readonly IHealthDataFacade _healthDataFacade;

        public HomepageController(
            IHealthMetricsService healthMetricsService,
            IHealthDataFacade healthDataFacade)
        {
            _healthMetricsService = healthMetricsService;
            _healthDataFacade = healthDataFacade;
        }

        // Existing endpoint for individual metrics
        [HttpGet("health-metrics")]
        public async Task<IActionResult> GetHealthMetrics(int userId)
        {
            var metrics = await _healthMetricsService.GetMetricsForUserAsync(userId);
            return metrics != null ? Ok(metrics) : NotFound();
        }

        // New facade endpoint for unified data
        [HttpGet("health-data")]
        public async Task<IActionResult> GetUnifiedHealthData(int userId)
        {
            var data = await _healthDataFacade.GetUnifiedHealthDataAsync(userId);
            return data != null ? Ok(data) : NotFound();
        }
    }
}