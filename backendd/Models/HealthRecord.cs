namespace backendd.Models
{
    public class HealthRecord // New name
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string MetricName { get; set; }
        public float MetricValue { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
    }
}
