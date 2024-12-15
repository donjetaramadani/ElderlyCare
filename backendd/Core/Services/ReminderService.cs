using backendd.Core.DataAccess;
using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.EntityFrameworkCore;


namespace backendd.Core.Services
{
    public class ReminderService : IReminderService
    {
        
        private readonly ApplicationDbContext _context;

        public ReminderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Reminder>> GetAllReminders()
        {
            return await _context.Reminders.ToListAsync();
        }

        public async Task<Reminder> GetReminderById(int id)
        {
            return await _context.Reminders.FindAsync(id);
        }

        public async Task<Reminder> Add(Reminder reminder)
        {
            await _context.Reminders.AddAsync(reminder);
            await _context.SaveChangesAsync();
            return reminder;
        }

        public async Task<Reminder> Update(int id, Reminder reminder)
        {
            var existingReminder = await _context.Reminders.FindAsync(id);
            if (existingReminder == null) return null;

            existingReminder.Message = reminder.Message;
            existingReminder.Time = reminder.Time;
            existingReminder.Status = reminder.Status;
            await _context.SaveChangesAsync();
            return existingReminder;
        }

        public async Task<bool> Delete(int id)
        {
            var reminder = await _context.Reminders.FindAsync(id);
            if (reminder == null) return false;

            _context.Reminders.Remove(reminder);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
