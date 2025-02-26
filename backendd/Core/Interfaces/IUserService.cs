using backendd.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace backendd.Core.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterUserAsync(User user, string password);
        Task<bool> LoginUserAsync(string email, string password);
        Task<User?> FindByEmailAsync(string email);
        Task<bool> CheckPasswordAsync(User user, string password);
        Task<IdentityResult> UpdateAsync(User user);
        Task<IdentityResult> ChangePasswordAsync(User user, string currentPassword, string newPassword);
        Task<IdentityResult> DeleteUserAsync(User user);
    }
}