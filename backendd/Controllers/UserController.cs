using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.AspNetCore.Identity;


namespace backendd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;
        private bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;
            return email.Contains("@") && email.Contains(".") && email.IndexOf("@") < email.LastIndexOf(".");
        }


        public UserController(IUserService userService, UserManager<User> userManager, IConfiguration configuration, IMemoryCache cache)
        {
            _userService = userService;
            _userManager = userManager;
            _configuration = configuration;
            _cache = cache;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { success = false, message = "Invalid data." });

            if (!IsValidEmail(model.Email))
                return BadRequest(new { success = false, message = "Invalid email format. Please provide a valid email." });
            var existingUser = await _userService.FindByEmailAsync(model.Email);
            if (existingUser != null)
            {
                return BadRequest(new { success = false, message = "User already exists. Please log in." });
            }

            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                FullName = model.FullName,
                PhoneNumber = model.PhoneNumber,
                DateOfBirth = model.DateOfBirth
            };

            var result = await _userService.RegisterUserAsync(user, model.Password);
            if (!result.Succeeded)
                return BadRequest(new { success = false, errors = result.Errors });

            return Ok(new { success = true, message = "User registered successfully!" });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginModel model)
        {
            if (!IsValidEmail(model.Email))
                return BadRequest(new { success = false, message = "Invalid email format. Please provide a valid email." });
            var user = await _userService.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest(new { success = false, message = "User does not exist. Please sign up." });

            var isPasswordValid = await _userService.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
                return Unauthorized(new { success = false, message = "Invalid credentials." });

            var token = GenerateJwtToken(user.Email);
            return Ok(new { token });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            // Extract the user's email from the JWT
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
                return Unauthorized(new { success = false, message = "Invalid token. Email is missing." });

            var user = await _userService.FindByEmailAsync(email);
            if (user == null)
                return NotFound(new { success = false, message = "User not found." });

            return Ok(new
            {
                fullName = user.FullName,
                email = user.Email,
                phoneNumber = user.PhoneNumber,
                profileImage = string.IsNullOrEmpty(user.ProfileImage)
                   ? "http://192.168.0.105:5196/assets/images/default-avatar.png" // Provide full URL for default image
                   : user.ProfileImage,
                dateOfBirth = user.DateOfBirth
            });

        }
        [HttpDelete("deleteAccount")]
        public async Task<IActionResult> DeleteAccount([FromBody] DeleteAccountModel model)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
                return Unauthorized(new { success = false, message = "Invalid token. Email is missing." });

            var user = await _userService.FindByEmailAsync(email);
            if (user == null)
                return NotFound(new { success = false, message = "User not found." });

            if (!string.Equals(email, model.Email, StringComparison.OrdinalIgnoreCase))
                return BadRequest(new { success = false, message = "Provided email does not match the account email." });

            var isPasswordValid = await _userService.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
                return BadRequest(new { success = false, message = "Invalid password. Please try again." });

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(new { success = false, message = "Failed to delete account." });

            return Ok(new { success = true, message = "Account deleted successfully." });
        }

        [HttpPut("updateProfile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateUserModel model)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var user = await _userService.FindByEmailAsync(email);
            if (user == null)
                return NotFound(new { success = false, message = "User not found." });

            if (!string.IsNullOrEmpty(model.CurrentPassword) && !string.IsNullOrEmpty(model.NewPassword))
            {
                var isPasswordValid = await _userService.CheckPasswordAsync(user, model.CurrentPassword);
                if (!isPasswordValid)
                {
                    return BadRequest(new { success = false, message = "Invalid current password." });
                }
                var passwordChangeResult = await _userService.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
                if (!passwordChangeResult.Succeeded)
                {
                    return BadRequest(new { success = false, message = "Failed to change password.", errors = passwordChangeResult.Errors });
                }
            }
            if (!string.IsNullOrEmpty(model.Email) && model.Email != user.Email)
            {
                user.Email = model.Email;
            }
            if (!string.IsNullOrEmpty(model.FullName))
            {
                user.FullName = model.FullName;
            }


            if (!string.IsNullOrEmpty(model.PhoneNumber))
            {
                user.PhoneNumber = model.PhoneNumber;
            }
            user.ProfileImage = string.IsNullOrEmpty(model.ProfileImage)
             ? $"{Request.Scheme}://{Request.Host}/assets/images/default-avatar.png"
             : model.ProfileImage;



            if (!string.IsNullOrEmpty(model.DateOfBirth))
            {
                if (DateTime.TryParse(model.DateOfBirth, out var parsedDate))
                {
                    user.DateOfBirth = parsedDate;
                }
                else
                {
                    return BadRequest(new { success = false, message = "Invalid date format. Use YYYY-MM-DD." });
                }
            }

            var updateResult = await _userService.UpdateAsync(user);
            if (!updateResult.Succeeded)
                return BadRequest(new { success = false, message = "Failed to update profile." });

            var newToken = GenerateJwtToken(user.Email);
            return Ok(new
            {
                success = true,
                message = "Profile updated successfully.",
                token = newToken,
                userData = new
                {
                    fullName = user.FullName,
                    email = user.Email,
                    phoneNumber = user.PhoneNumber,
                    profileImage = user.ProfileImage,
                    dateOfBirth = user.DateOfBirth
                }
            });
        }

        [HttpGet("profile/notifications")]
        public async Task<IActionResult> GetNotificationPreferences()
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var user = await _userService.FindByEmailAsync(email);
            if (user == null)
                return NotFound(new { success = false, message = "User not found." });

            return Ok(new
            {
                success = true,
                preferences = new
                {
                    emailNotifications = user.EmailNotifications,
                    pushNotifications = user.PushNotifications,
                    smsNotifications = user.SmsNotifications,
                }
            });
        }

        [HttpPut("profile/notifications")]
        public async Task<IActionResult> UpdateNotificationPreferences([FromBody] NotificationPreferencesModel model)
        {
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var user = await _userService.FindByEmailAsync(email);
            if (user == null)
                return NotFound(new { success = false, message = "User not found." });

            user.EmailNotifications = model.EmailNotifications;
            user.PushNotifications = model.PushNotifications;
            user.SmsNotifications = model.SmsNotifications;

            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
                return BadRequest(new { success = false, message = "Failed to update preferences." });

            return Ok(new { success = true, message = "Preferences updated successfully." });
        }

        public class NotificationPreferencesModel
        {
            public bool EmailNotifications { get; set; }
            public bool PushNotifications { get; set; }
            public bool SmsNotifications { get; set; }
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var email = User.FindFirstValue(ClaimTypes.Email); // Extract email from JWT
            if (string.IsNullOrEmpty(email))
                return Unauthorized(new { success = false, message = "Invalid token." });

            var user = await _userService.FindByEmailAsync(email); // Find user by email
            if (user == null)
                return NotFound(new { success = false, message = "User not found." });

            var result = await _userService.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
            if (!result.Succeeded)
            {
                return BadRequest(new { success = false, message = "Password change failed.", errors = result.Errors });
            }

            return Ok(new { success = true, message = "Password changed successfully!" });
        }


        public class ChangePasswordModel
        {
            public string CurrentPassword { get; set; } = string.Empty;
            public string NewPassword { get; set; } = string.Empty;
        }



        private string GenerateJwtToken(string email)
        {
            var key = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(key))
                throw new InvalidOperationException("JWT signing key is not configured in appsettings.json.");

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
        new Claim(ClaimTypes.Email, email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
    };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // User Register Model
    public class UserRegisterModel
    {
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public DateTime DateOfBirth { get; set; }
    }

    // User Login Model
    public class UserLoginModel
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    // User Update Model
    public class UpdateUserModel
    {
        public string? FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? ProfileImage { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Email { get; set; }
        public string? CurrentPassword { get; set; }
        public string? NewPassword { get; set; }
    }
    public class DeleteAccountModel
    {
        public string Email { get; set; } = string.Empty; // Email confirmation
        public string Password { get; set; } = string.Empty; // Password confirmation
    }
}
