using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;

namespace backendd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        public PaymentController()
        {
            StripeConfiguration.ApiKey = "sk_test_51PUzHw02TSHp6Y0Yl5JZEZMwIOXeJDueHvfgj7rfUnFQweMdb4xSry5WaYGt5CXOOOLxiztf2cXARDkTWvnt87df00aheEMZ3Q"; // Retrieve from appsettings.json
        }


        [HttpPost("create-payment-intent")]
        public IActionResult CreatePaymentIntent([FromBody] PaymentRequest paymentRequest)
        {
            try
            {
                if (paymentRequest == null || paymentRequest.Amount <= 0)
                {
                    return BadRequest(new { error = "Invalid payment amount." });
                }

                var options = new PaymentIntentCreateOptions
                {
                    Amount = paymentRequest.Amount, // Use the dynamic amount from the request
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" },
                };

                var service = new PaymentIntentService();
                PaymentIntent intent = service.Create(options);

                return Ok(new { clientSecret = intent.ClientSecret });
            }
            catch (StripeException ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }



        public class PaymentRequest
        {
            public int Amount { get; set; } 
        }
    }
}
