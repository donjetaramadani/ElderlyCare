using System;

namespace backendd.Models
{
    public class Recommendation
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Tip { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
