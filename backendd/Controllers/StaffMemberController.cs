using backendd.Models;
using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffMemberController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StaffMemberController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/StaffMember
        [HttpPost]
        public IActionResult CreateStaffMember([FromBody] StaffMember staffMember)
        {
            if (staffMember == null)
            {
                return BadRequest("Staff member data is null.");
            }

            // Add staff member to the database
            _context.StaffMembers.Add(staffMember);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetStaffMemberById), new { id = staffMember.Id }, staffMember);
        }

        // GET: api/StaffMember/{id}
        [HttpGet("{id}")]
        public IActionResult GetStaffMemberById(int id)
        {
            var staffMember = _context.StaffMembers.FirstOrDefault(s => s.Id == id);
            if (staffMember == null)
            {
                return NotFound("Staff member not found.");
            }

            return Ok(staffMember);
        }

        // PUT: api/StaffMember/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateStaffMember(int id, [FromBody] StaffMember staffMember)
        {
            if (staffMember == null || staffMember.Id != id)
            {
                return BadRequest("Staff member data is invalid.");
            }

            var existingStaffMember = _context.StaffMembers.FirstOrDefault(s => s.Id == id);
            if (existingStaffMember == null)
            {
                return NotFound("Staff member not found.");
            }

            existingStaffMember.Name = staffMember.Name;
            existingStaffMember.Position = staffMember.Position;
            existingStaffMember.Phone = staffMember.Phone;
            existingStaffMember.Email = staffMember.Email;
            existingStaffMember.History = staffMember.History;
            existingStaffMember.Image = staffMember.Image;

            _context.SaveChanges();
            return NoContent();
        }

        // DELETE: api/StaffMember/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteStaffMember(int id)
        {
            var staffMember = _context.StaffMembers.FirstOrDefault(s => s.Id == id);
            if (staffMember == null)
            {
                return NotFound("Staff member not found.");
            }

            _context.StaffMembers.Remove(staffMember);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
