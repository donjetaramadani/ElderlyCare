namespace backendd.Core.Dtos
{
    public class AppointmentDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Date { get; set; }
        public string Staff { get; set; }
        public int HospitalId { get; set; }
    }
}
