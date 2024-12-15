using backendd.Models;

namespace backendd.Core.Interfaces
{
    public interface IReminderService
    {
        Task<List<Reminder>> GetAllReminders();
        Task<Reminder> GetReminderById(int id);
        Task<Reminder> Add(Reminder reminder);
        Task<Reminder> Update(int id, Reminder reminder);
        Task<bool> Delete(int id);
    }
}
