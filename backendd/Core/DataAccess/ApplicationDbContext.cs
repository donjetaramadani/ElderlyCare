using Microsoft.EntityFrameworkCore;
using backendd.Models;

namespace backendd.Core.DataAccess
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Define your DbSets
        public DbSet<HealthMetrics> HealthMetrics { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Recommendation> Recommendations { get; set; }
        public DbSet<Reminder> Reminders { get; set; }
        public DbSet<SOSLog> SOSLogs { get; set; }
        
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure HealthMetrics
            builder.Entity<HealthMetrics>()
                .Property(h => h.UserId)
                .IsRequired(); // Ensure UserId is mandatory for association.

            // Configure Activities
            builder.Entity<Activity>()
                .Property(a => a.UserId)
                .IsRequired();

            // Configure Notifications
            builder.Entity<Notification>()
                .Property(n => n.UserId)
                .IsRequired();

            // Configure Recommendations
            builder.Entity<Recommendation>()
                .Property(r => r.UserId)
                .IsRequired();
        }
    }
}
