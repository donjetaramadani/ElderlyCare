using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using backendd.Core.Dtos;   
using backendd.Models;
using System.Threading.Tasks;

namespace backendd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public AppointmentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateAppointment([FromBody] AppointmentDto appointment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data.");
            }

            var newAppointment = new Appointment
            {
                Name = appointment.Name,
                Email = appointment.Email,
                Phone = appointment.Phone,
                Date = appointment.Date,
                Staff = appointment.Staff,
                HospitalId = appointment.HospitalId,
            };

            _context.Appointments.Add(newAppointment);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Appointment successfully created." });
        }
    }

}
