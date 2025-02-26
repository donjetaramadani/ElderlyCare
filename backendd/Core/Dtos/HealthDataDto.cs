using backendd.Models;
using System.Collections.Generic;

namespace backendd.Core.Dtos
{
    public class HealthDataDto
    {
        public List<HealthMetrics> HealthMetrics { get; set; } = new();
        public List<Recommendation> Recommendations { get; set; } = new();
        public List<Reminder> Reminders { get; set; } = new();
        public List<string> Errors { get; set; } = new();
    }
}