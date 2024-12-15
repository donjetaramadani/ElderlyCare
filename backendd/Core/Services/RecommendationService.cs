using backendd.Core.DataAccess;
using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.EntityFrameworkCore;


namespace backendd.Core.Services
{
    public class RecommendationService : IRecommendationService
    {
       
        private readonly ApplicationDbContext _context;

        public RecommendationService(ApplicationDbContext context)
        {
            _context = context;
        }

      
        public async Task<List<Recommendation>> GetAllRecommendations()
        {
            return await _context.Recommendations.ToListAsync();
        }

        public async Task<Recommendation> GetRecommendationById(int id)
        {
            return await _context.Recommendations.FindAsync(id);
        }

        public async Task<Recommendation> Add(Recommendation recommendation)
        {
            await _context.Recommendations.AddAsync(recommendation);
            await _context.SaveChangesAsync();
            return recommendation;
        }

        public async Task<Recommendation> Update(int id, Recommendation recommendation)
        {
            var existingRecommendation = await _context.Recommendations.FindAsync(id);
            if (existingRecommendation == null) return null;

            existingRecommendation.Title = recommendation.Title;
            existingRecommendation.Description = recommendation.Description;
            existingRecommendation.Tip = recommendation.Tip;
            await _context.SaveChangesAsync();
            return existingRecommendation;
        }

        public async Task<bool> Delete(int id)
        {
            var recommendation = await _context.Recommendations.FindAsync(id);
            if (recommendation == null) return false;

            _context.Recommendations.Remove(recommendation);
            await _context.SaveChangesAsync();
            return true;
        }
     }
}
