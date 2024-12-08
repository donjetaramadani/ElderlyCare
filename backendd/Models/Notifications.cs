﻿using System;

namespace backendd.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Message { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
