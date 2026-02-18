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

        // =========================
        // ADMIN USER MANAGEMENT
        // =========================
        [Authorize(Roles = "Admin")]
        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _context.LISFPAUsers
                .Select(u => new
                {
                    u.UserId,
                    u.Username,
                    u.Role,
                    u.IsActive,
                    u.CreatedAt,
                    u.UpdatedAt,
                    u.LastLoginAt
                })
                .ToListAsync();
            return Ok(users);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("users/{id}/role")]
        public async Task<IActionResult> UpdateUserRole(int id, [FromBody] RoleUpdateRequest request)
        {
            var user = await _context.LISFPAUsers.FindAsync(id);
            if (user == null) return NotFound("User not found");

            // Only allow "User" or "Admin" roles
            if (request.Role != "User" && request.Role != "Admin")
                return BadRequest("Invalid role");

            user.Role = request.Role;
            user.UpdatedAt = DateTime.Now;
            await _context.SaveChangesAsync();

            return Ok("User role updated successfully");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("users/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.LISFPAUsers.FindAsync(id);
            if (user == null) return NotFound("User not found");

            _context.LISFPAUsers.Remove(user);
            await _context.SaveChangesAsync();

            return Ok("User deleted successfully");
        }

       


    }
}
