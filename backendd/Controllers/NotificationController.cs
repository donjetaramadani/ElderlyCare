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
    }
}

