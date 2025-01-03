using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using backendd.Models;

namespace backendd.Core.DataAccess
{
    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<HealthMetrics> HealthMetrics { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Recommendation> Recommendations { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<SOSLog> SOSLogs { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure the User entity
            builder.Entity<User>(entity =>
            {
                // Ensure FullName is required
                entity.Property(u => u.FullName).IsRequired();

                // Ensure PhoneNumber is required
                entity.Property(u => u.PhoneNumber).IsRequired(false); // Optional if nullable is desired

                // Ensure DateOfBirth is required
                entity.Property(u => u.DateOfBirth).IsRequired();

                // Optional: Set a default value for ProfileImage if needed
                entity.Property(u => u.ProfileImage).HasDefaultValue(null); // Optional
            });
        }
    }
}
