using backendd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendd.Core.Interfaces
{
    public interface INotificationService
    {
        Task<List<Notification>> GetAllNotificationsAsync();
        Task<Notification?> GetNotificationByIdAsync(int id);
        Task<Notification> AddNotificationAsync(Notification notification);
        Task<Notification?> UpdateNotificationAsync(int id, Notification notification);
        Task<bool> DeleteNotificationAsync(int id);
    }
}