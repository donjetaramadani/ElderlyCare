using backendd.Models;

namespace backendd.Core.Interfaces
{
    public interface ISOSService
    {
        Task<List<SOSLog>> GetAllSOSLogs();
        Task<SOSLog> GetSOSLogById(int id);
        Task<SOSLog> Add(SOSLog sosLog);
        Task<SOSLog> Update(int id, SOSLog sosLog);
        Task<bool> Delete(int id);
    }
}
