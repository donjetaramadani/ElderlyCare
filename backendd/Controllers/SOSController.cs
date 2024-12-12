using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using backendd.Models;

namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SOSController : ControllerBase
    {
     
        private readonly ApplicationDbContext _context;

        public SOSController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/sos-alert
        [HttpPost]
        public async Task<ActionResult> SendSOSAlert(SOSLog sosLog)
        {
            if (sosLog == null)
            {
                return BadRequest("Invalid SOS data.");
            }

            _context.SOSLogs.Add(sosLog);
            await _context.SaveChangesAsync();

            return Ok("SOS alert logged successfully.");
        }
    }
}
