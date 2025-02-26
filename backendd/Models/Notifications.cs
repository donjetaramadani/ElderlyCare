using System;
using System.ComponentModel.DataAnnotations;

namespace backendd.Models
{
    public class Notification
    {
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Message { get; set; } = string.Empty;

        [Required]
        public string Type { get; set; } = string.Empty;

        [Required]
        public string Status { get; set; } = "Unread"; // Default to "Unread"



        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
