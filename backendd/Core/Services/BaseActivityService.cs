using backendd.Core.DataAccess;
using backendd.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

public abstract class BaseActivityService
{
    protected ApplicationDbContext _context;

    protected BaseActivityService(ApplicationDbContext context)
    {
        _context = context;
    }

    public virtual async Task<List<Activity>> GetAllActivities()
    {
        return await _context.Activities.ToListAsync();
    }

    public virtual async Task<Activity> AddActivity(Activity activity)
    {
        await _context.Activities.AddAsync(activity);
        await _context.SaveChangesAsync();
        return activity;
    }
}