using System;

namespace backendd.Models
{
    public class Notification
    {
        public int Id { get; set; } // Ensure this is a primary key
        public int UserId { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
