using Microsoft.AspNetCore.Mvc;
using System;

namespace backendd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        [HttpPost("send-to-caregiver")]
        public IActionResult SendOrderToCaregiver([FromBody] SendOrderRequest request)
        {
            if (request == null || request.TotalAmount <= 0)
            {
                return BadRequest(new { Message = "Invalid order details." });
            }

            try
            {
              
                string caregiverNotification = $"Order Details: Amount - ${request.TotalAmount}, Message - {request.Message}";

               
                Console.WriteLine(caregiverNotification);

               
                return Ok(new { Message = "Order sent to caregiver successfully!" });
            }
            catch (Exception ex)
            {
               
                Console.WriteLine($"Error sending order to caregiver: {ex.Message}");
                return StatusCode(500, new { Message = "Failed to send order to caregiver." });
            }
        }

        public class SendOrderRequest
        {
            public decimal TotalAmount { get; set; } 
            public string Message { get; set; } 
        }
    }
}
