using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace backendd.Models
{
    public class Activity
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public DateTime Timestamp { get; set; }

        [Required]
        public int WeeklyProgress { get; set; }

        [Required]
        public int MonthlyProgress { get; set; }

        public int AggregateWeeklyProgress(IEnumerable<HealthMetrics> metrics)
        {
            return metrics.Sum(m => m.Steps);
        }
    }
}
