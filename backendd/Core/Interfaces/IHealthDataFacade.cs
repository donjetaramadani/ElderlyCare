using System.Threading.Tasks;
using backendd.Core.Dtos;
using backendd.Models;

namespace backendd.Core.Interfaces
{
    public interface IHealthDataFacade
    {
        Task<HealthDataDto> GetUnifiedHealthDataAsync(int userId);
    }
}