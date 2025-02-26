using backendd.Core.DataAccess;
using backendd.Core.Interfaces;
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

    public async Task<List<Notification>> GetAllNotificationsAsync()
    {
        return await _context.Notifications
            .AsNoTracking()
            .ToListAsync()
            .ConfigureAwait(false);
    }

    public async Task<Notification?> GetNotificationByIdAsync(int id)
    {
        return await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == id)
            .ConfigureAwait(false);
    }

    public async Task<Notification> AddNotificationAsync(Notification notification)
    {
        await _context.Notifications.AddAsync(notification)
            .ConfigureAwait(false);
        await _context.SaveChangesAsync()
            .ConfigureAwait(false);
        return notification;
    }

    public async Task<Notification?> UpdateNotificationAsync(int id, Notification notification)
    {
        var existing = await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == id)
            .ConfigureAwait(false);

        if (existing == null) return null;

        existing.Message = notification.Message;
        existing.Status = notification.Status;
        existing.CreatedAt = notification.CreatedAt;

        await _context.SaveChangesAsync()
            .ConfigureAwait(false);
        return existing;
    }

    public async Task<bool> DeleteNotificationAsync(int id)
    {
        var notification = await _context.Notifications
            .FirstOrDefaultAsync(n => n.Id == id)
            .ConfigureAwait(false);

        if (notification == null) return false;

        _context.Notifications.Remove(notification);
        await _context.SaveChangesAsync()
            .ConfigureAwait(false);
        return true;
    }
}