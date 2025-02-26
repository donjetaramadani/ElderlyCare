using backendd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendd.Core.Interfaces
{
    public interface ISOSService
    {
        Task<List<SOSLog>> GetAllSOSLogsAsync();
        Task<SOSLog> GetSOSLogByIdAsync(int id);
        Task<SOSLog> AddAsync(SOSLog sosLog);
        Task<SOSLog> UpdateAsync(int id, SOSLog sosLog);
        Task<bool> DeleteAsync(int id);
    }
}
