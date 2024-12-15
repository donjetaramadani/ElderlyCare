using backendd.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


public interface IActivityService
{
    Task<List<Activity>> GetAllActivities();
    Task<Activity> GetActivityById(int id);
    Task<Activity> Add(Activity activity);
    Task<Activity> Update(int id, Activity activity);
    Task<bool> Delete(int id);
}

