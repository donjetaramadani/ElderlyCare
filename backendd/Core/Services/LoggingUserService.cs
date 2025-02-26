using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace backendd.Core.Services
{
    public class LoggingUserService : IUserService
    {
        private readonly IUserService _userService;
        private readonly ILogger<LoggingUserService> _logger;

        public LoggingUserService(IUserService userService, ILogger<LoggingUserService> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        public async Task<IdentityResult> RegisterUserAsync(User user, string password)
        {
            _logger.LogInformation("Registering user: {Email}", user.Email);
            return await _userService.RegisterUserAsync(user, password);
        }

        public async Task<bool> LoginUserAsync(string email, string password)
        {
            _logger.LogInformation("Login attempt for user: {Email}", email);
            return await _userService.LoginUserAsync(email, password);
        }

        public async Task<User> FindByEmailAsync(string email)
        {
            _logger.LogInformation("Searching for user with email: {Email}", email);
            return await _userService.FindByEmailAsync(email);
        }

        public async Task<bool> CheckPasswordAsync(User user, string password)
        {
            _logger.LogInformation("Checking password for user: {UserId}", user.Id);
            return await _userService.CheckPasswordAsync(user, password);
        }

        public async Task<IdentityResult> UpdateAsync(User user)
        {
            _logger.LogInformation("Updating user: {UserId}", user.Id);
            return await _userService.UpdateAsync(user);
        }

        public async Task<IdentityResult> ChangePasswordAsync(User user, string currentPassword, string newPassword)
        {
            _logger.LogInformation("Changing password for user: {UserId}", user.Id);
            return await _userService.ChangePasswordAsync(user, currentPassword, newPassword);
        }

        public async Task<IdentityResult> DeleteUserAsync(User user)
        {
            _logger.LogInformation("Deleting user: {UserId}", user.Id);
            return await _userService.DeleteUserAsync(user);
        }
    }
}