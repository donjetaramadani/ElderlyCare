using System.Collections.Generic;
using System.Linq;

namespace backendd.Models
{
    public class Activity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int WeeklyProgress { get; set; }
        public int MonthlyProgress { get; set; }

        public int AggregateWeeklyProgress(IEnumerable<HealthMetrics> metrics)
        {
            return metrics.Sum(m => m.Steps);
        }
    }
}
