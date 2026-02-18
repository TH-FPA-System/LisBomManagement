using System;
namespace LisBomManagement.Models
{
    public class LISFPAUser
    {
        public int UserId { get; set; }

        public string Username { get; set; }
        public string PasswordHash { get; set; }

        public string Role { get; set; }
        public bool IsActive { get; set; }

        // ✅ Add timestamp fields
        public DateTime? CreatedAt { get; set; }      // when user is registered
        public DateTime? UpdatedAt { get; set; }      // last update
        public DateTime? LastLoginAt { get; set; }    // last login
    }
}