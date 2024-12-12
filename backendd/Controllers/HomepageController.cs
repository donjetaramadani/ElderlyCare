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

        // Update health metrics
        [HttpPut("health-metrics/{id}")]
        public IActionResult UpdateHealthMetrics(int id, [FromBody] HealthMetrics updatedMetrics)
        {
            var existingMetric = _context.HealthMetrics.FirstOrDefault(h => h.Id == id);
            if (existingMetric == null) return NotFound();

            existingMetric.HeartRate = updatedMetrics.HeartRate;
            existingMetric.Steps = updatedMetrics.Steps;
            existingMetric.Calories = updatedMetrics.Calories;
            existingMetric.Timestamp = updatedMetrics.Timestamp;

            _context.SaveChanges();
            return Ok(existingMetric);
        }

        // Delete health metrics
        [HttpDelete("health-metrics/{id}")]
        public IActionResult DeleteHealthMetrics(int id)
        {
            var metric = _context.HealthMetrics.FirstOrDefault(h => h.Id == id);
            if (metric == null) return NotFound();

            _context.HealthMetrics.Remove(metric);
            _context.SaveChanges();
            return NoContent();
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

        // Update activity
        [HttpPut("activities/{id}")]
        public IActionResult UpdateActivity(int id, [FromBody] Activity updatedActivity)
        {
            var existingActivity = _context.Activities.FirstOrDefault(a => a.Id == id);
            if (existingActivity == null) return NotFound();

            existingActivity.Description = updatedActivity.Description;
            existingActivity.Timestamp = updatedActivity.Timestamp;

            _context.SaveChanges();
            return Ok(existingActivity);
        }

        // Delete activity
        [HttpDelete("activities/{id}")]
        public IActionResult DeleteActivity(int id)
        {
            var activity = _context.Activities.FirstOrDefault(a => a.Id == id);
            if (activity == null) return NotFound();

            _context.Activities.Remove(activity);
            _context.SaveChanges();
            return NoContent();
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

        // Delete notification
        [HttpDelete("notifications/{id}")]
        public IActionResult DeleteNotification(int id)
        {
            var notification = _context.Notifications.FirstOrDefault(n => n.Id == id);
            if (notification == null) return NotFound();

            _context.Notifications.Remove(notification);
            _context.SaveChanges();
            return NoContent();
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

        // Update recommendation
        [HttpPut("recommendations/{id}")]
        public IActionResult UpdateRecommendation(int id, [FromBody] Recommendation updatedRecommendation)
        {
            var existingRecommendation = _context.Recommendations.FirstOrDefault(r => r.Id == id);
            if (existingRecommendation == null) return NotFound();

            existingRecommendation.Title = updatedRecommendation.Title;
            existingRecommendation.Description = updatedRecommendation.Description;

            _context.SaveChanges();
            return Ok(existingRecommendation);
        }

        // Delete recommendation
        [HttpDelete("recommendations/{id}")]
        public IActionResult DeleteRecommendation(int id)
        {
            var recommendation = _context.Recommendations.FirstOrDefault(r => r.Id == id);
            if (recommendation == null) return NotFound();

            _context.Recommendations.Remove(recommendation);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
