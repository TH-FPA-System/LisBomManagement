using LisBomManagement.Helper;
using LisBomManagement.Models;
using LISBOMWebAPI.Data;
using LISBOMWebAPI.Helpers;
using LISBOMWebAPI.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

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

        // =========================
        // LOGIN
        // =========================
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and password are required");
            }

            // Find active user
            var user = await _context.LISFPAUsers
                .FirstOrDefaultAsync(u =>
                    u.Username == request.Username &&
                    u.IsActive);

            if (user == null)
                return Unauthorized("Invalid username or password");

            // Verify password
            bool passwordOk = PasswordHelper.VerifyPassword(
                request.Password,
                user.PasswordHash
            );

            if (!passwordOk)
                return Unauthorized("Invalid username or password");

            // ✅ Update login timestamps
            user.LastLoginAt = DateTime.Now;  // stamp last login time
            user.UpdatedAt = DateTime.Now;    // update record updated time
            _context.LISFPAUsers.Update(user);
            await _context.SaveChangesAsync();

            // Generate JWT token
            var token = JwtTokenHelper.GenerateToken(user, _config);

            // Return response
            return Ok(new
            {
                token,
                username = user.Username,
                role = user.Role
            });
        }

        // =========================
        // REGISTER
        // =========================
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Username) ||
                string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Username and password are required");
            }

            var exists = await _context.LISFPAUsers
                .AnyAsync(u => u.Username == request.Username);

            if (exists)
                return BadRequest("Username already exists");

            var user = new LISFPAUser
            {
                Username = request.Username,
                PasswordHash = PasswordHelper.HashPassword(request.Password),
                Role = string.IsNullOrEmpty(request.Role) ? "User" : request.Role,
                IsActive = true,
                CreatedAt = DateTime.Now,
                UpdatedAt = null
            };

            _context.LISFPAUsers.Add(user);
            await _context.SaveChangesAsync();

            return Ok("User registered successfully");
        }

        // =========================
        // SECURE TEST
        // =========================
        [Authorize]
        [HttpGet("secure-test")]
        public IActionResult SecureTest()
        {
            return Ok(new
            {
                username = User.Identity?.Name,
                role = User.FindFirstValue(ClaimTypes.Role)
            });
        }

        // =========================
        // ADMIN ONLY
        // =========================
        [Authorize(Roles = "Admin")]
        [HttpGet("admin-test")]
        public IActionResult AdminOnly()
        {
            return Ok("You are ADMIN ✅");
        }
    }
}
