using backendd.Core.DataAccess; 
using backendd.Models;
using Microsoft.EntityFrameworkCore;

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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<HealthMetrics>()
                  .HasOne<User>() // Assuming you have a User model
                  .WithMany()
                  .HasForeignKey(h => h.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
