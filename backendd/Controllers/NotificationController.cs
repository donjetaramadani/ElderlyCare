using backendd.Core.DataAccess;
using backendd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public NotificationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/notifications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotifications()
        {
            var notifications = await _context.Notifications.ToListAsync();

            if (notifications == null || !notifications.Any())
            {
                return NotFound("No notifications found.");
            }

            return Ok(notifications);
        }

        // GET: api/notifications/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetUserNotifications(int userId)
        {
            var notifications = await _context.Notifications
                                      .Where(n => n.UserId == userId)
                                      .ToListAsync();

            if (notifications == null || !notifications.Any())
            {
                return NotFound($"No notifications found for user with ID {userId}.");
            }

            return Ok(notifications);
        }

        // PUT: api/notifications/mark-read
        [HttpPut("mark-read")]
        public async Task<IActionResult> MarkNotificationsAsRead([FromBody] int[] notificationIds)
        {
            var notifications = await _context.Notifications
                .Where(n => notificationIds.Contains(n.Id))
                .ToListAsync();

            if (!notifications.Any())
            {
                return NotFound("No notifications found to update.");
            }

            foreach (var notification in notifications)
            {
                notification.Status = "Read"; // Update status to "Read"
            }

            await _context.SaveChangesAsync();
            return Ok("Notifications marked as read.");
        }

        // POST: api/notifications
        [HttpPost]
        public async Task<ActionResult<Notification>> CreateNotification([FromBody] Notification notification)
        {
            if (notification == null)
            {
                return BadRequest("Invalid notification data.");
            }

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotifications), new { id = notification.Id }, notification);
        }

        // DELETE: api/notifications
        [HttpDelete]
        public async Task<IActionResult> DeleteNotifications([FromBody] int[] notificationIds)
        {
            var notifications = await _context.Notifications
                .Where(n => notificationIds.Contains(n.Id))
                .ToListAsync();

            if (!notifications.Any())
            {
                return NotFound("No notifications found to delete.");
            }

            _context.Notifications.RemoveRange(notifications);
            await _context.SaveChangesAsync();

            return Ok("Notifications deleted successfully.");
        }

        // GET: api/notifications/sorted?sortBy=CreatedAt&order=desc
        [HttpGet("sorted")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetSortedNotifications(
            [FromQuery] string sortBy = "CreatedAt", 
            [FromQuery] string order = "asc")
        {
            IQueryable<Notification> query = _context.Notifications;

            // Sorting logic
            if (sortBy.Equals("CreatedAt", StringComparison.OrdinalIgnoreCase))
            {
                query = order.Equals("desc", StringComparison.OrdinalIgnoreCase) 
                    ? query.OrderByDescending(n => n.CreatedAt)
                    : query.OrderBy(n => n.CreatedAt);
            }
            else if (sortBy.Equals("Status", StringComparison.OrdinalIgnoreCase))
            {
                query = order.Equals("desc", StringComparison.OrdinalIgnoreCase) 
                    ? query.OrderByDescending(n => n.Status)
                    : query.OrderBy(n => n.Status);
            }

            var notifications = await query.ToListAsync();

            if (!notifications.Any())
            {
                return NotFound("No notifications found for the given sort criteria.");
            }

            return Ok(notifications);
        }

        // GET: api/notifications/filter?status=Unread&userId=1
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetFilteredNotifications(
            [FromQuery] string status, 
            [FromQuery] int? userId)
        {
            IQueryable<Notification> query = _context.Notifications;

            // Filtering logic
            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(n => n.Status.Equals(status, StringComparison.OrdinalIgnoreCase));
            }

            if (userId.HasValue)
            {
                query = query.Where(n => n.UserId == userId);
            }

            var notifications = await query.ToListAsync();

            if (!notifications.Any())
            {
                return NotFound("No notifications found for the given filter criteria.");
            }

            
            return Ok(notifications);
        }


        
    }
}
  