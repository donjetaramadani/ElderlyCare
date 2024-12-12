using backendd.Core.DataAccess; 
using Microsoft.AspNetCore.Mvc;
using backendd.Models;
using System.Linq;

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

            // Get health metrics for a user
            [HttpGet("health-metrics")]
            public IActionResult GetHealthMetrics(int userId)
            {
                var healthMetrics = _context.HealthMetrics.Where(h => h.UserId == userId).ToList();
                return Ok(healthMetrics);
            }

            // Add or update health metrics
            [HttpPost("health-metrics")]
            public IActionResult AddOrUpdateHealthMetrics([FromBody] HealthMetrics newMetrics)
            {
                if (newMetrics == null)
                    return BadRequest("Health metrics cannot be null.");

                var existingMetrics = _context.HealthMetrics.FirstOrDefault(h => h.Id == newMetrics.Id);
                if (existingMetrics != null)
                {
                    existingMetrics.HeartRate = newMetrics.HeartRate;
                    existingMetrics.Steps = newMetrics.Steps;
                    existingMetrics.Calories = newMetrics.Calories;
                    existingMetrics.Timestamp = newMetrics.Timestamp;
                }
                else
                {
                    _context.HealthMetrics.Add(newMetrics);
                }

                _context.SaveChanges();
                return Ok(newMetrics);
            }

            // Get activities for a user
            [HttpGet("activities")]
            public IActionResult GetActivities(int userId)
            {
                var activities = _context.Activities.Where(a => a.UserId == userId).ToList();
                return Ok(activities);
            }

            // Add a new activity
            [HttpPost("add-activity")]
            public IActionResult AddActivity([FromBody] Activity newActivity)
            {
                if (newActivity == null)
                    return BadRequest("Activity cannot be null.");

                _context.Activities.Add(newActivity);
                _context.SaveChanges();
                return Ok(newActivity);
            }

            // Get notifications for a user
            [HttpGet("notifications")]
            public IActionResult GetNotifications(int userId)
            {
                var notifications = _context.Notifications.Where(n => n.UserId == userId).ToList();
                return Ok(notifications);
            }

            // Add a notification
            [HttpPost("add-notification")]
            public IActionResult AddNotification([FromBody] Notification newNotification)
            {
                if (newNotification == null)
                    return BadRequest("Notification cannot be null.");

                _context.Notifications.Add(newNotification);
                _context.SaveChanges();
                return Ok(newNotification);
            }

            // Get recommendations for a user
            [HttpGet("recommendations")]
            public IActionResult GetRecommendations(int userId)
            {
                var recommendations = _context.Recommendations.Where(r => r.UserId == userId).ToList();
                return Ok(recommendations);
            }

            // Add a recommendation
            [HttpPost("add-recommendation")]
            public IActionResult AddRecommendation([FromBody] Recommendation newRecommendation)
            {
                if (newRecommendation == null)
                    return BadRequest("Recommendation cannot be null.");

                _context.Recommendations.Add(newRecommendation);
                _context.SaveChanges();
                return Ok(newRecommendation);
            }
        }
}
