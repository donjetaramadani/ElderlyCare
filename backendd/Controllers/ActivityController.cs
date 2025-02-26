using Microsoft.AspNetCore.Mvc;
using backendd.Core.Interfaces;
using backendd.Models;


namespace backendd.Controllers
{
    public class ActivityController
    {
        [Route("api/[controller]")]
        [ApiController]
        public class ActivitiesController : ControllerBase
        {
            private readonly IActivityService _activityService;

            public ActivitiesController(IActivityService activityService)
            {
                _activityService = activityService;
            }

            [HttpGet]
            public async Task<IActionResult> GetAllActivities()
            {
                var activities = await _activityService.GetAllActivities();
                return Ok(activities);
            }

            [HttpGet("{id}")]
            public async Task<IActionResult> GetActivityById(int id)
            {
                var activity = await _activityService.GetActivityById(id);
                if (activity == null) return NotFound();
                return Ok(activity);
            }

            [HttpPost]
            public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
            {
                var createdActivity = await _activityService.Add(activity);
                return CreatedAtAction(nameof(GetActivityById), new { id = createdActivity.Id }, createdActivity);
            }

            [HttpPut("{id}")]
            public async Task<IActionResult> UpdateActivity(int id, [FromBody] Activity activity)
            {
                var updatedActivity = await _activityService.Update(id, activity);
                if (updatedActivity == null) return NotFound();
                return Ok(updatedActivity);
            }

            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteActivity(int id)
            {
                var result = await _activityService.Delete(id);
                if (!result) return NotFound();
                return NoContent();
            }
        }
    }
}
