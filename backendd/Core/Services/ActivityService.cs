using backendd.Core.DataAccess;
using backendd.Core.Interfaces;
using backendd.Core.DataAccess;
using backendd.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace backendd.Core.Services
{
    public class ActivityService : IActivityService
    {
       
        private readonly ApplicationDbContext _context;

        public ActivityService(ApplicationDbContext context)
        {
            _context = context;
        }
        
        public async Task<List<Activity>> GetAllActivities()
        {
            return await _context.Activities.ToListAsync();
        }

        public async Task<Activity> GetActivityById(int id)
        {
            return await _context.Activities.FindAsync(id);
        }

        public async Task<Activity> Add(Activity activity)
        {
            await _context.Activities.AddAsync(activity);
            await _context.SaveChangesAsync();
            return activity;
        }

        public async Task<Activity> Update(int id, Activity activity)
        {
            var existingActivity = await _context.Activities.FindAsync(id);
            if (existingActivity == null) return null;

            existingActivity.UserId = activity.UserId;
            existingActivity.Description = activity.Description;
            existingActivity.Timestamp = activity.Timestamp;
            existingActivity.WeeklyProgress = activity.WeeklyProgress;
            existingActivity.MonthlyProgress = activity.MonthlyProgress;
            await _context.SaveChangesAsync();
            return existingActivity;
        }

        public async Task<bool> Delete(int id)
        {
            var activity = await _context.Activities.FindAsync(id);
            if (activity == null) return false;

            _context.Activities.Remove(activity);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
