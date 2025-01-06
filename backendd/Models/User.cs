using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace backendd.Models
{
    public class User : IdentityUser
    {
        [Required]
        public string FullName { get; set; }

        public new string PhoneNumber { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string? ProfileImage { get; set; }

        // Notification Preferences
        public bool EmailNotifications { get; set; } = true; // Default enabled
        public bool PushNotifications { get; set; } = true;  // Default enabled
        public bool SmsNotifications { get; set; } = true;   // Default enabled
    }
}
