using System;

namespace backendd.Models
{
    public class HealthMetrics
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int HeartRate { get; set; }
        public int Steps { get; set; }
        public int Calories { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
