using backendd.Models;
using Microsoft.AspNetCore.SignalR;

namespace backendd.Hubs
{
    public class NotificationHub : Hub
    {
        private readonly INotificationService _notificationService;

        public NotificationHub(INotificationService notificationService)
        {
        _notificationService = notificationService;
        }

        public async Task SendNotification(Notification notification)
        {
            // Add notification to the database
            await _notificationService.Add(notification);

            // Send the notification to connected clients
            await Clients.All.SendAsync("ReceiveNotification", notification);
        }

        public async Task BroadcastNotification(string message)
        {
            // Broadcasts a notification to all connected users
            await Clients.All.SendAsync("ReceiveNotification", message);
        }
    }
}
