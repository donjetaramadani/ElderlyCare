namespace backendd.Models
{
    public class SOSLog
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public string Location { get; set; } = string.Empty;  // Geolocation or address details

    }
}
