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
            var recommendations = await _recommendationService.GetAllRecommendations();
            return Ok(recommendations);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRecommendationById(int id)
        {
            var recommendation = await _recommendationService.GetRecommendationById(id);
            if (recommendation == null) return NotFound();
            return Ok(recommendation);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRecommendation([FromBody] Recommendation recommendation)
        {
            var createdRecommendation = await _recommendationService.Add(recommendation);
            return CreatedAtAction(nameof(GetRecommendationById), new { id = createdRecommendation.Id }, createdRecommendation);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRecommendation(int id, [FromBody] Recommendation recommendation)
        {
            var updatedRecommendation = await _recommendationService.Update(id, recommendation);
            if (updatedRecommendation == null) return NotFound();
            return Ok(updatedRecommendation);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecommendation(int id)
        {
            var result = await _recommendationService.Delete(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
