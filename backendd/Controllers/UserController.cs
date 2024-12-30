using backendd.Core.Interfaces;
using backendd.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backendd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService, IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { success = false, message = "Invalid data." });

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
            // Check if the user exists
            var user = await _userService.FindByEmailAsync(model.Email);
            if (user == null)
                return BadRequest("User does not exist. Please sign up.");

            // Check if password is correct
            var isPasswordValid = await _userService.CheckPasswordAsync(user, model.Password);
            if (!isPasswordValid)
                return Unauthorized("Invalid credentials");

            // Generate JWT token
            var token = GenerateJwtToken(user.Email);
            return Ok(new { Token = token });
        }

        [HttpGet("getProfile")]
        public async Task<IActionResult> GetProfile()
        {
            // Extract the user's email from the JWT
            var email = User.FindFirstValue(ClaimTypes.Email);
            if (string.IsNullOrEmpty(email))
                return Unauthorized(new { success = false, message = "Invalid token." });

            // Fetch the user from the database
            var user = await _userService.FindByEmailAsync(email);
            if (user == null)
                return NotFound(new { success = false, message = "User not found." });

            // Return the user's profile data
            return Ok(new
            {
                fullName = user.FullName,
                email = user.Email,
                phoneNumber = user.PhoneNumber,
                profileImage = user.ProfileImage, // Adjust field if needed
                dateOfBirth = user.DateOfBirth
            });
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

    if (!string.IsNullOrEmpty(model.FullName))
        user.FullName = model.FullName;

    if (!string.IsNullOrEmpty(model.PhoneNumber))
        user.PhoneNumber = model.PhoneNumber;

    if (!string.IsNullOrEmpty(model.ProfileImage))
        user.ProfileImage = model.ProfileImage;

    user.DateOfBirth = model.DateOfBirth;

    var result = await _userService.UpdateAsync(user);
    if (!result.Succeeded)
        return BadRequest(new { success = false, message = "Failed to update profile." });

    return Ok(new { success = true, message = "Profile updated successfully." });
}


        private string GenerateJwtToken(string email)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(ClaimTypes.Email, email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }

    // User Register Model
    public class UserRegisterModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
    }

    // User Login Model
    public class UserLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    // User Update Model
    public class UpdateUserModel
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string? ProfileImage { get; set; } 
        public DateTime DateOfBirth { get; set; }
    }
}
