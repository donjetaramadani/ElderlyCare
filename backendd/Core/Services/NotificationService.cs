using backendd.Core.DataAccess;
using backendd.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

public class NotificationService : INotificationService
{
    private readonly ApplicationDbContext _context;

    public NotificationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Notification>> GetAllNotifications()
    {
        return await _context.Notifications.ToListAsync();
    }

    public async Task<Notification> GetNotificationById(int id)
    {
        return await _context.Notifications.FindAsync(id);
    }

    public async Task<Notification> Add(Notification notification)
    {
        await _context.Notifications.AddAsync(notification);
        await _context.SaveChangesAsync();
        return notification;
    }

    public async Task<Notification> Update(int id, Notification notification)
    {
        var existingNotification = await _context.Notifications.FindAsync(id);
        if (existingNotification == null) return null;

        existingNotification.Message = notification.Message;
        await _context.SaveChangesAsync();
        return existingNotification;
    }

    public async Task<bool> Delete(int id)
    {
        var notification = await _context.Notifications.FindAsync(id);
        if (notification == null) return false;

        _context.Notifications.Remove(notification);
        await _context.SaveChangesAsync();
        return true;
    }
}
