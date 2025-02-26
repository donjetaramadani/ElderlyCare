using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Threading.Tasks;

public class CachingUserService : IUserService
{
    private readonly IUserService _userService;
    private readonly IDistributedCache _cache;
    private readonly ILogger<CachingUserService> _logger;
    private const string CacheKeyPrefix = "user:";

    public CachingUserService(
        IUserService userService,
        IDistributedCache cache,
        ILogger<CachingUserService> logger)
    {
        _userService = userService;
        _cache = cache;
        _logger = logger;
    }

    public async Task<IdentityResult> RegisterUserAsync(User user, string password)
    {
        var result = await _userService.RegisterUserAsync(user, password);
        if (result.Succeeded)
        {
            await ClearUserCache(user.Email!);
        }
        return result;
    }

    public async Task<bool> LoginUserAsync(string email, string password)
    {
        var result = await _userService.LoginUserAsync(email, password);
        if (result)
        {
            await ClearUserCache(email);
        }
        return result;
    }

    public async Task<User?> FindByEmailAsync(string email)
    {
        var cacheKey = $"{CacheKeyPrefix}{email}";
        var cachedBytes = await _cache.GetAsync(cacheKey);

        if (cachedBytes != null)
        {
            try
            {
                return JsonSerializer.Deserialize<User>(cachedBytes);
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Failed to deserialize cached user data");
                await _cache.RemoveAsync(cacheKey);
            }
        }

        var user = await _userService.FindByEmailAsync(email);
        if (user != null)
        {
            var userBytes = JsonSerializer.SerializeToUtf8Bytes(user);
            await _cache.SetAsync(
                cacheKey,
                userBytes,
                new DistributedCacheEntryOptions
                {
                    AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10)
                });
        }
        return user;
    }

    public async Task<bool> CheckPasswordAsync(User user, string password)
    {
        return await _userService.CheckPasswordAsync(user, password);
    }

    public async Task<IdentityResult> UpdateAsync(User user)
    {
        var result = await _userService.UpdateAsync(user);
        if (result.Succeeded)
        {
            await ClearUserCache(user.Email!);
        }
        return result;
    }

    public async Task<IdentityResult> ChangePasswordAsync(User user, string currentPassword, string newPassword)
    {
        var result = await _userService.ChangePasswordAsync(user, currentPassword, newPassword);
        if (result.Succeeded)
        {
            await ClearUserCache(user.Email!);
        }
        return result;
    }

    public async Task<IdentityResult> DeleteUserAsync(User user)
    {
        var result = await _userService.DeleteUserAsync(user);
        if (result.Succeeded)
        {
            await ClearUserCache(user.Email!);
        }
        return result;
    }

    private async Task ClearUserCache(string email)
    {
        var cacheKey = $"{CacheKeyPrefix}{email}";
        await _cache.RemoveAsync(cacheKey);
        _logger.LogInformation("Cleared cache for user: {Email}", email);
    }
}