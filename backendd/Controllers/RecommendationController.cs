using backendd.Core.DataAccess;
using backendd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationController : ControllerBase
    {
            private readonly ApplicationDbContext _context;

            public RecommendationController(ApplicationDbContext context)
            {
                _context = context;
            }

            // GET: api/recommendations
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Recommendation>>> GetRecommendations()
            {
                var recommendations = await _context.Recommendations.ToListAsync();

                if (recommendations == null || !recommendations.Any())
                {
                    return NotFound("No recommendations found.");
                }

                return Ok(recommendations);
            }
     }
}
