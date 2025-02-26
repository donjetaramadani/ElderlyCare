using backendd.Core.DataAccess;
using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace backendd.Core.Services
{
    public class RecommendationService : IRecommendationService
    {

        private readonly ApplicationDbContext _context;

        public RecommendationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Recommendation>> GetAllRecommendationsAsync()
        {
            return await _context.Recommendations.ToListAsync();
        }

        public async Task<Recommendation> GetRecommendationByIdAsync(int id)
        {
            return await _context.Recommendations.FindAsync(id);
        }

        public async Task<Recommendation> AddAsync(Recommendation recommendation)
        {
            await _context.Recommendations.AddAsync(recommendation);
            await _context.SaveChangesAsync();
            return recommendation;
        }

        public async Task<Recommendation> UpdateAsync(int id, Recommendation recommendation)
        {
            var existing = await _context.Recommendations.FindAsync(id);
            if (existing == null) return null;

            existing.Title = recommendation.Title;
            existing.Description = recommendation.Description;
            existing.Tip = recommendation.Tip;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var recommendation = await _context.Recommendations.FindAsync(id);
            if (recommendation == null) return false;

            _context.Recommendations.Remove(recommendation);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
