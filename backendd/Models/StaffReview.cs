using System;

namespace backendd.Models
{
    public class StaffReview
    {
        public int Id { get; set; }
        public int StaffId { get; set; }
        public string Author { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public DateTime Date { get; set; }
    }
}
