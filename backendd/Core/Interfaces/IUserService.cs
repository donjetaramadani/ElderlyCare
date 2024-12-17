using backendd.Models;
using Microsoft.AspNetCore.Identity;

namespace backendd.Core.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterUserAsync(User user, string password); // Fixed
        Task<bool> LoginUserAsync(string email, string password);          // Fixed
        Task<User> FindByEmailAsync(string email);
        Task<bool> CheckPasswordAsync(User user, string password);
    }
}
