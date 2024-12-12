using backendd.Core.DataAccess;
using backendd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Notifications Endpoints
app.MapGet("/notifications", async (HttpContext context, ApplicationDbContext db) =>
{
    var notifications = await db.Notifications.ToListAsync();
    if (notifications == null) return Results.NotFound();
    return Results.Ok(notifications);
}).WithTags("Notifications").WithName("GetNotifications");

app.MapPost("/notifications", async (HttpContext context, ApplicationDbContext db, Notification notification) =>
{
    db.Notifications.Add(notification);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/notifications", new { id = notification.Id });
}).WithTags("Notifications").WithName("CreateNotification");

// Recommendations Endpoints
app.MapGet("/recommendations", async (HttpContext context, ApplicationDbContext db) =>
{
    var recommendations = await db.Recommendations.ToListAsync();
    if (recommendations == null) return Results.NotFound();
    return Results.Ok(recommendations);
}).WithTags("Recommendations").WithName("GetRecommendations");

app.MapPost("/recommendations", async (HttpContext context, ApplicationDbContext db, Recommendation recommendation) =>
{
    db.Recommendations.Add(recommendation);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/recommendations", new { id = recommendation.Id });
}).WithTags("Recommendations").WithName("CreateRecommendation");

// Reminders Endpoints
app.MapGet("/reminders", async (HttpContext context, ApplicationDbContext db) =>
{
    var reminders = await db.Reminders.ToListAsync();
    if (reminders == null) return Results.NotFound();
    return Results.Ok(reminders);
}).WithTags("Reminders").WithName("GetReminders");

app.MapPost("/reminders", async (HttpContext context, ApplicationDbContext db, Reminder reminder) =>
{
    db.Reminders.Add(reminder);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/reminders", new { id = reminder.Id });
}).WithTags("Reminders").WithName("CreateReminder");

// SOS Alert
app.MapPost("/sos-alert", async (HttpContext context, ApplicationDbContext db, SOSLog sos) =>
{
    db.SOSLogs.Add(sos);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/sos-alert", new { id = sos.Id });
}).WithTags("SOS Alerts").WithName("CreateSOSAlert");

// Homepage Endpoints
app.MapGet("/api/Homepage/health-metrics", async (HttpContext context, ApplicationDbContext db) =>
{
    var healthMetrics = await db.HealthMetrics.ToListAsync();
    if (healthMetrics == null) return Results.NotFound();
    return Results.Ok(healthMetrics);
}).WithTags("Homepage").WithName("GetHealthMetrics");

app.MapPost("/api/Homepage/health-metrics", async (HttpContext context, ApplicationDbContext db, HealthMetrics healthMetric) =>
{
    db.HealthMetrics.Add(healthMetric);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/api/Homepage/health-metrics", new { id = healthMetric.Id });
}).WithName("CreateHealthMetric");


app.MapPut("/api/Homepage/health-metrics/{id}", async (int id, HttpContext context, ApplicationDbContext db, HealthMetrics updatedMetric) =>
{
    var metric = await db.HealthMetrics.FindAsync(id);
    if (metric == null) return Results.NotFound();

    metric.Description = updatedMetric.Description; // Update only necessary properties
    await db.SaveChangesAsync();
    return Results.Ok(metric);
}).WithTags("Homepage").WithName("UpdateHealthMetric");

app.MapDelete("/api/Homepage/health-metrics/{id}", async (int id, HttpContext context, ApplicationDbContext db) =>
{
    var metric = await db.HealthMetrics.FindAsync(id);
    if (metric == null) return Results.NotFound();

    db.HealthMetrics.Remove(metric);
    await db.SaveChangesAsync();
    return Results.NoContent();
}).WithTags("Homepage").WithName("DeleteHealthMetric");

app.MapGet("/api/Homepage/activities", async (HttpContext context, ApplicationDbContext db) =>
{
    var activities = await db.Activities.ToListAsync();
    if (activities == null) return Results.NotFound();
    return Results.Ok(activities);
}).WithTags("Homepage").WithName("GetActivities");

app.MapPost("/api/Homepage/add-activity", async (HttpContext context, ApplicationDbContext db, Activity activity) =>
{
    db.Activities.Add(activity);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/api/Homepage/add-activity", new { id = activity.Id });
}).WithTags("Homepage").WithName("CreateActivity");

app.MapGet("/api/Homepage/notifications", async (HttpContext context, ApplicationDbContext db) =>
{
    var notifications = await db.Notifications.ToListAsync();
    if (notifications == null) return Results.NotFound();
    return Results.Ok(notifications);
}).WithTags("Homepage").WithName("GetHomepageNotifications");

app.MapPost("/api/Homepage/add-notification", async (HttpContext context, ApplicationDbContext db, Notification notification) =>
{
    db.Notifications.Add(notification);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/api/Homepage/add-notification", new { id = notification.Id });
}).WithTags("Homepage").WithName("CreateHomepageNotification");

app.MapPut("/api/Homepage/notifications/{id}", async (int id, HttpContext context, ApplicationDbContext db, Notification updatedNotification) =>
{
    var notification = await db.Notifications.FindAsync(id);
    if (notification == null) return Results.NotFound();

    notification.Message = updatedNotification.Message; // Update only necessary properties
    await db.SaveChangesAsync();
    return Results.Ok(notification);
}).WithTags("Homepage").WithName("UpdateHomepageNotification");

app.MapDelete("/api/Homepage/notifications/{id}", async (int id, HttpContext context, ApplicationDbContext db) =>
{
    var notification = await db.Notifications.FindAsync(id);
    if (notification == null) return Results.NotFound();

    db.Notifications.Remove(notification);
    await db.SaveChangesAsync();
    return Results.NoContent();
}).WithTags("Homepage").WithName("DeleteHomepageNotification");


app.MapGet("/api/Homepage/recommendations", async (HttpContext context, ApplicationDbContext db) =>
{
    var recommendations = await db.Recommendations.ToListAsync();
    if (recommendations == null) return Results.NotFound();
    return Results.Ok(recommendations);
}).WithTags("Homepage").WithName("GetHomepageRecommendations");

app.MapPost("/api/Homepage/add-recommendation", async (HttpContext context, ApplicationDbContext db, Recommendation recommendation) =>
{
    db.Recommendations.Add(recommendation);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/api/Homepage/add-recommendation", new { id = recommendation.Id });
}).WithTags("Homepage").WithName("CreateHomepageRecommendation");

// Notification Endpoints
app.MapGet("/api/Notification", async (HttpContext context, ApplicationDbContext db) =>
{
    var notifications = await db.Notifications.ToListAsync();
    if (notifications == null) return Results.NotFound();
    return Results.Ok(notifications);
}).WithTags("API Notifications").WithName("GetApiNotifications");

// Recommendation Endpoints
app.MapGet("/api/Recommendation", async (HttpContext context, ApplicationDbContext db) =>
{
    var recommendations = await db.Recommendations.ToListAsync();
    if (recommendations == null) return Results.NotFound();
    return Results.Ok(recommendations);
}).WithTags("API Recommendations").WithName("GetApiRecommendations");

// Reminder Endpoints
app.MapGet("/api/Reminder", async (HttpContext context, ApplicationDbContext db) =>
{
    var reminders = await db.Reminders.ToListAsync();
    if (reminders == null) return Results.NotFound();
    return Results.Ok(reminders);
}).WithTags("API Reminders").WithName("GetApiReminders");

app.MapPost("/api/Reminder", async (HttpContext context, ApplicationDbContext db, Reminder reminder) =>
{
    db.Reminders.Add(reminder);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/api/Reminder", new { id = reminder.Id });
}).WithTags("API Reminders").WithName("CreateApiReminder");

// SOS Endpoints
app.MapPost("/api/SOS", async (HttpContext context, ApplicationDbContext db, SOSLog sos) =>
{
    db.SOSLogs.Add(sos);
    await db.SaveChangesAsync();
    return Results.CreatedAtRoute("/api/SOS", new { id = sos.Id });
}).WithTags("API SOS").WithName("CreateApiSOS");

app.Run();
