using backendd.Models;
using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaffReviewController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StaffReviewController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/StaffReview
        [HttpPost]
        public ActionResult<StaffReview> PostReview(StaffReview review)
        {
            if (review == null)
            {
                return BadRequest("Invalid review data.");
            }

            // Ensure review text and rating are valid
            if (string.IsNullOrWhiteSpace(review.Text) || review.Rating < 1 || review.Rating > 5)
            {
                return BadRequest("Review must have valid text and a rating between 1 and 5.");
            }

            // Check if the staff member exists in StaffMember table
            var staffExists = _context.StaffMembers.Any(s => s.Id == review.StaffId);
            if (!staffExists)
            {
                return NotFound("Staff member not found.");
            }

            // If the staff member exists, save the review
            review.Date = review.Date == default ? DateTime.UtcNow : review.Date;

            _context.StaffReviews.Add(review);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetReviews), new { staffId = review.StaffId }, review);
        }

        // Get all reviews for a specific staff member with optional pagination and sorting
        [HttpGet("{staffId}")]
        public ActionResult<IEnumerable<StaffReview>> GetReviews(int staffId, int page = 1, int pageSize = 10, string sortOrder = "latest")
        {
            var reviews = _context.StaffReviews.Where(r => r.StaffId == staffId);

            if (!reviews.Any())
            {
                return NotFound("No reviews found for this staff member.");
            }

            reviews = sortOrder.ToLower() == "earliest"
                ? reviews.OrderBy(r => r.Date)
                : reviews.OrderByDescending(r => r.Date);

            var paginatedReviews = reviews
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(paginatedReviews);
        }

        // DELETE: api/StaffReview/{reviewId}
        [HttpDelete("{reviewId}")]
        public IActionResult DeleteReview(int reviewId)
        {
            // Find the review by its ID
            var review = _context.StaffReviews.FirstOrDefault(r => r.Id == reviewId);

            if (review == null)
            {
                return NotFound("Review not found.");
            }

            // Remove the review from the database
            _context.StaffReviews.Remove(review);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
