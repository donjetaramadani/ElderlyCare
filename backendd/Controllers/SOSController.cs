using backendd.Core.DataAccess;
using Microsoft.AspNetCore.Mvc;
using backendd.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using backendd.Core.Interfaces;
using backendd.Core.Services;
using System.Threading.Tasks;

namespace backendd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SOSController : ControllerBase
    {
        private readonly ISOSService _sosService;

        public SOSController(ISOSService sosService)
        {
            _sosService = sosService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSOSLogs()
        {
            var sosLogs = await _sosService.GetAllSOSLogs();
            return Ok(sosLogs);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSOSLogById(int id)
        {
            var sosLog = await _sosService.GetSOSLogById(id);
            if (sosLog == null) return NotFound();
            return Ok(sosLog);
        }

        [HttpPost]
        public async Task<IActionResult> CreateSOSLog([FromBody] SOSLog sosLog)
        {
            var createdSOSLog = await _sosService.Add(sosLog);
            return CreatedAtAction(nameof(GetSOSLogById), new { id = createdSOSLog.Id }, createdSOSLog);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSOSLog(int id, [FromBody] SOSLog sosLog)
        {
            var updatedSOSLog = await _sosService.Update(id, sosLog);
            if (updatedSOSLog == null) return NotFound();
            return Ok(updatedSOSLog);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSOSLog(int id)
        {
            var result = await _sosService.Delete(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
