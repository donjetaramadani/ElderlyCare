using System;
using System.ComponentModel.DataAnnotations;

namespace backendd.Models
{
    public class Notification
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string? Message { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; }
    }
}
