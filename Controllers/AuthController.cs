using LisBomManagement.Helper;
using LISBOMWebAPI.Data;
using LISBOMWebAPI.Models;
using LISBOMWebAPI.Models.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using LISBOMWebAPI.Helpers;


namespace LISBOMWebAPI.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly BOMDbContext _context;
        private readonly IConfiguration _config;

        public AuthController(BOMDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and password are required");
            }

            // Find user in DB
            var user = await _context.LISFPAUsers
                .FirstOrDefaultAsync(u => u.Username == request.Username && u.IsActive);

            if (user == null)
                return Unauthorized("Invalid username or password");

            // Verify password
            bool passwordOk = PasswordHelper.VerifyPassword(request.Password, user.PasswordHash);
            if (!passwordOk)
                return Unauthorized("Invalid username or password");

            // Generate JWT token
            var token = JwtTokenHelper.GenerateToken(user, _config);

            // Return token + user info
            return Ok(new
            {
                token,
                user.Username,
                user.Role
            });
        }

        // Optional test endpoint to verify token
        [HttpGet("secure-test")]
        [Microsoft.AspNetCore.Authorization.Authorize]
        public IActionResult SecureTest()
        {
            return Ok($"Hello {User.Identity?.Name}, you are authenticated!");
        }
    }
}
