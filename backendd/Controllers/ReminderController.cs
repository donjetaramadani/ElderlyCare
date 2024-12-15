using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backendd.Models;
using backendd.Core.Interfaces;
using backendd.Core.Services;
using System.Threading.Tasks;

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
            if (reminder == null) return NotFound();
            return Ok(reminder);
        }

        [HttpPost]
        public async Task<IActionResult> CreateReminder([FromBody] Reminder reminder)
        {
            var createdReminder = await _reminderService.Add(reminder);
            return CreatedAtAction(nameof(GetReminderById), new { id = createdReminder.Id }, createdReminder);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateReminder(int id, [FromBody] Reminder reminder)
        {
            var updatedReminder = await _reminderService.Update(id, reminder);
            if (updatedReminder == null) return NotFound();
            return Ok(updatedReminder);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReminder(int id)
        {
            var result = await _reminderService.Delete(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
