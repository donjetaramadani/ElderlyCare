using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.AspNetCore.Mvc;

namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RemindersController : ControllerBase
    {
        private readonly IReminderService _reminderService;

        public RemindersController(IReminderService reminderService)
        {
            _reminderService = reminderService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllReminders()
        {
            var reminders = await _reminderService.GetAllReminders();
            return Ok(reminders);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetReminderById(int id)
        {
            var reminder = await _reminderService.GetReminderById(id);
            if (reminder == null) return NotFound("Reminder not found");
            return Ok(reminder);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReminder([FromBody] Reminder reminder)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data");

            var createdReminder = await _reminderService.AddReminder(reminder);
            return CreatedAtAction(nameof(GetReminderById), new { id = createdReminder.Id }, createdReminder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReminder(int id, [FromBody] Reminder reminder)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data");

            var updatedReminder = await _reminderService.UpdateReminder(id, reminder);
            if (updatedReminder == null) return NotFound("Reminder not found");

            return Ok(updatedReminder);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReminder(int id)
        {
            var result = await _reminderService.DeleteReminder(id);
            if (!result) return NotFound("Reminder not found");

            return NoContent();
        }
    }
}
