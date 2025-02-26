namespace backendd.Models
{
    public class Reminder
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime Time { get; set; }
        public string Status { get; set; } = "Pending"; // e.g., pending, completed
    }
}
