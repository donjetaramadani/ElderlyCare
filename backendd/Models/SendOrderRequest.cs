namespace backendd.Models
{
    public class SendOrderRequest
    {
        public decimal TotalAmount { get; set; }
        public string Message { get; set; }
    }
}
