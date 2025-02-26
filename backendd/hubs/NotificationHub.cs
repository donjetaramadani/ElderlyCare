using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

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
            var createdNotification = await _notificationService.AddNotificationAsync(notification);
            await Clients.All.SendAsync("ReceiveNotification", createdNotification);
        }

        public async Task BroadcastMessage(string message)
        {
            await Clients.All.SendAsync("ReceiveBroadcast", message);
        }
    }
}