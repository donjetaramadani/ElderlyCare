using System;
using System.ComponentModel.DataAnnotations;

namespace backendd.Models
{
    public class HealthMetrics
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public int HeartRate { get; set; }

        [Required]
        public int Steps { get; set; }

        [Required]
        public int Calories { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
