namespace backendd.Models
{
    public class Review
    {
        public int Id { get; set; }
        public int HospitalId { get; set; } // Foreign key for hospital
        public string User { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; } // Rating from 1-5
        public DateTime Timestamp { get; set; } = DateTime.Now;
    }
}
