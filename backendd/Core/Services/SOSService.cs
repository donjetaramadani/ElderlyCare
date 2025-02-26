using backendd.Core.DataAccess;
using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.EntityFrameworkCore;

namespace backendd.Core.Services
{
    public class SOSService : ISOSService
    {

        private readonly ApplicationDbContext _context;

        public SOSService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<SOSLog>> GetAllSOSLogsAsync()
        {
            return await _context.SOSLogs.ToListAsync();
        }

        public async Task<SOSLog> GetSOSLogByIdAsync(int id)
        {
            return await _context.SOSLogs.FindAsync(id);
        }

        public async Task<SOSLog> AddAsync(SOSLog sosLog)
        {
            await _context.SOSLogs.AddAsync(sosLog);
            await _context.SaveChangesAsync();
            return sosLog;
        }

        public async Task<SOSLog> UpdateAsync(int id, SOSLog sosLog)
        {
            var existing = await _context.SOSLogs.FindAsync(id);
            if (existing == null) return null;

            existing.Timestamp = sosLog.Timestamp;
            existing.Location = sosLog.Location;

            await _context.SaveChangesAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var log = await _context.SOSLogs.FindAsync(id);
            if (log == null) return false;

            _context.SOSLogs.Remove(log);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
