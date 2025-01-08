using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using backendd.Core;
using backendd.Models;
using System.Linq;

namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get reviews for a specific hospital
        [HttpGet("{hospitalId}")]
        public IActionResult GetReviews(int hospitalId)
        {
            var reviews = _context.Reviews.Where(r => r.HospitalId == hospitalId).ToList();
            return Ok(reviews);
        }

        // Add a new review
        [HttpPost]
        public IActionResult AddReview([FromBody] Review review)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            _context.Reviews.Add(review);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetReviews), new { hospitalId = review.HospitalId }, review);
        }

        // Delete a review
        [HttpDelete("{id}")]
        public IActionResult DeleteReview(int id, string user)
        {
            var review = _context.Reviews.FirstOrDefault(r => r.Id == id && r.User == user);
            if (review == null)
            {
                return NotFound("Review not found or you are not authorized to delete it.");
            }

            _context.Reviews.Remove(review);
            _context.SaveChanges();
            return Ok("Review deleted successfully.");
        }

    }
}
