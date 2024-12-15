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

        public async Task<List<SOSLog>> GetAllSOSLogs()
        {
            return await _context.SOSLogs.ToListAsync();
        }

        public async Task<SOSLog> GetSOSLogById(int id)
        {
            return await _context.SOSLogs.FindAsync(id);
        }

        public async Task<SOSLog> Add(SOSLog sosLog)
        {
            await _context.SOSLogs.AddAsync(sosLog);
            await _context.SaveChangesAsync();
            return sosLog;
        }

        public async Task<SOSLog> Update(int id, SOSLog sosLog)
        {
            var existingSOSLog = await _context.SOSLogs.FindAsync(id);
            if (existingSOSLog == null) return null;

            existingSOSLog.Timestamp = sosLog.Timestamp;
            existingSOSLog.Location = sosLog.Location;
            await _context.SaveChangesAsync();
            return existingSOSLog;
        }

        public async Task<bool> Delete(int id)
        {
            var sosLog = await _context.SOSLogs.FindAsync(id);
            if (sosLog == null) return false;

            _context.SOSLogs.Remove(sosLog);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
