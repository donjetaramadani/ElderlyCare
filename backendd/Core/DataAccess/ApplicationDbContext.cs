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

            builder.Entity<HealthMetrics>().Property(h => h.UserId).IsRequired();
            builder.Entity<Activity>().Property(a => a.UserId).IsRequired();
            builder.Entity<Recommendation>().Property(r => r.UserId).IsRequired();
            builder.Entity<Notification>().Property(n => n.UserId).IsRequired();
        }
    }
}
