using backendd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendd.Core.Interfaces
{
    public interface IRecommendationService
    {
        Task<List<Recommendation>> GetAllRecommendationsAsync();
        Task<Recommendation> GetRecommendationByIdAsync(int id);
        Task<Recommendation> AddAsync(Recommendation recommendation);
        Task<Recommendation> UpdateAsync(int id, Recommendation recommendation);
        Task<bool> DeleteAsync(int id);
    }
}
