using backendd.Models;

namespace backendd.Core.Interfaces
{
    public interface IReminderService
    {
        Task<List<Reminder>> GetAllReminders();
        Task<Reminder?> GetReminderById(int id);
        Task<Reminder> AddReminder(Reminder reminder);
        Task<Reminder?> UpdateReminder(int id, Reminder reminder);
        Task<bool> DeleteReminder(int id);
    }
}
