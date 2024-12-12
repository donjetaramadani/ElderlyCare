using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backendd.Models;

namespace backendd.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class ReminderController : ControllerBase
    {

            private readonly ApplicationDbContext _context;

            public ReminderController(ApplicationDbContext context)
            {
                _context = context;
            }

            // GET: api/reminders
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Reminder>>> GetReminders()
            {
                var reminders = await _context.Reminders.ToListAsync();

                if (reminders == null || !reminders.Any())
                {
                    return NotFound("No reminders found.");
                }

                return Ok(reminders);
            }

            // POST: api/add-reminder
            [HttpPost]
            public async Task<ActionResult> AddReminder(Reminder reminder)
            {
                if (reminder == null)
                {
                    return BadRequest("Invalid reminder data.");
                }

                _context.Reminders.Add(reminder);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetReminders), new { id = reminder.Id }, reminder);
            }
    }
}
