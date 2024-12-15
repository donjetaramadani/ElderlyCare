using backendd.Core.DataAccess;
using backendd.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class NotificationService : INotificationService
{
    private readonly ApplicationDbContext _dbContext;

    public NotificationService(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<List<Notification>> GetAllNotifications()
    {
        return await _dbContext.Notifications.ToListAsync();
    }

    public async Task<Notification> GetNotificationById(int id)
    {
        return await _dbContext.Notifications.FindAsync(id);
    }

    public async Task<Notification> Add(Notification notification)
    {
        await _dbContext.Notifications.AddAsync(notification);
        await _dbContext.SaveChangesAsync();
        return notification;
    }

    public async Task<Notification> Update(int id, Notification notification)
    {
        var existingNotification = await _dbContext.Notifications.FindAsync(id);
        if (existingNotification == null) return null;

        existingNotification.Message = notification.Message;
        await _dbContext.SaveChangesAsync();
        return existingNotification;
    }

    public async Task<bool> Delete(int id)
    {
        var notification = await _dbContext.Notifications.FindAsync(id);
        if (notification == null) return false;

        _dbContext.Notifications.Remove(notification);
        await _dbContext.SaveChangesAsync();
        return true;
    }
}
