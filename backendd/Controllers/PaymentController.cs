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
        public IActionResult CreatePaymentIntent()
        {
            try
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = 5000, 
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
