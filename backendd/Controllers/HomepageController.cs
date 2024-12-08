using backendd.Core.DataAccess; 
using Microsoft.AspNetCore.Mvc;
using backendd.Models;

namespace backendd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HomepageController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public HomepageController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Example action: Get all health metrics
        [HttpGet("health-metrics")]
        public IActionResult GetHealthMetrics()
        {
            var healthMetrics = _context.HealthMetrics.ToList();
            return Ok(healthMetrics);
        }

        // Example action: Add a new activity
        [HttpPost("add-activity")]
        public IActionResult AddActivity([FromBody] Activity newActivity)
        {
            if (newActivity == null)
                return BadRequest("Activity cannot be null.");

            _context.Activities.Add(newActivity);
            _context.SaveChanges();
            return Ok(newActivity);
        }
    }
}
