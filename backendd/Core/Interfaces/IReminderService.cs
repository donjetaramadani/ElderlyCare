using backendd.Models;

namespace backendd.Core.Interfaces
{
    public interface IReminderService
    {
        Task<List<Reminder>> GetAllRemindersAsync();
        Task<Reminder> GetReminderByIdAsync(int id);
        Task<Reminder> AddAsync(Reminder reminder);
        Task<Reminder> UpdateAsync(int id, Reminder reminder);
        Task<bool> DeleteAsync(int id);
    }
}
