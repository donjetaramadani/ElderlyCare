using backendd.Core.Interfaces;
using backendd.Core.Services;
using backendd.Models;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        private readonly IRecommendationService _recommendationService;

        public RecommendationsController(IRecommendationService recommendationService)
        {
            _recommendationService = recommendationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllRecommendations()
        {
            var recommendations = await _recommendationService.GetAllRecommendationsAsync();
            return Ok(recommendations);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecommendationById(int id)
        {
            var recommendation = await _recommendationService.GetRecommendationByIdAsync(id);
            if (recommendation == null) return NotFound();
            return Ok(recommendation);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecommendation([FromBody] Recommendation recommendation)
        {
            var created = await _recommendationService.AddAsync(recommendation);
            return CreatedAtAction(nameof(GetRecommendationById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecommendation(int id, [FromBody] Recommendation recommendation)
        {
            var updated = await _recommendationService.UpdateAsync(id, recommendation);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecommendation(int id)
        {
            var result = await _recommendationService.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
