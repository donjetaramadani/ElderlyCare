using backendd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface INotificationService
{
    Task<List<Notification>> GetAllNotifications();
    Task<Notification> GetNotificationById(int id);
    Task<Notification> Add(Notification notification);
    Task<Notification> Update(int id, Notification notification);
    Task<bool> Delete(int id);
}
