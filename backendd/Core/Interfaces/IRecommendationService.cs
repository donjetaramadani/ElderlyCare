using backendd.Models;


namespace backendd.Core.Interfaces
{
    public interface IRecommendationService
    {
        Task<List<Recommendation>> GetAllRecommendations();
        Task<Recommendation> GetRecommendationById(int id);
        Task<Recommendation> Add(Recommendation recommendation);
        Task<Recommendation> Update(int id, Recommendation recommendation);
        Task<bool> Delete(int id);
    }
}
