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
        return BadRequest(ModelState);

    var user = new User
    {
        UserName = model.Email,
        Email = model.Email,
        FullName = model.FullName,
        PhoneNumber = model.PhoneNumber,
        DateOfBirth = model.DateOfBirth
    };

    var result = await _userService.RegisterUserAsync(user, model.Password); // Fixed

    if (!result.Succeeded)
        return BadRequest(result.Errors);

    return Ok("User registered successfully!");
}

[HttpPost("login")]
public async Task<IActionResult> Login([FromBody] UserLoginModel model)
{
    var success = await _userService.LoginUserAsync(model.Email, model.Password); // Fixed
    if (!success)
        return Unauthorized("Invalid credentials");

    var token = GenerateJwtToken(model.Email);
    return Ok(new { Token = token });
}


        private string GenerateJwtToken(string email)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
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

    public class UserRegisterModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfBirth { get; set; }
    }

    public class UserLoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
