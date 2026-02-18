using LisBomManagement.Models;
using LISBOMWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LISBOMWebAPI.Data
{
    public class BOMDbContext : DbContext
    {
        public BOMDbContext(DbContextOptions<BOMDbContext> options)
            : base(options) { }

        public DbSet<Part> Parts { get; set; }
        public DbSet<PartIssue> PartIssues { get; set; }
        public DbSet<PartStructure> PartStructures { get; set; }
        public DbSet<PartTest> PartTests { get; set; }
        public DbSet<PartPropertyData> PartPropertyDatas { get; set; }
        public DbSet<PartMap> PartMaps { get; set; } = null!;

        // ✅ NEW: User table
        public DbSet<LISFPAUser> LISFPAUsers { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite keys
            modelBuilder.Entity<PartIssue>()
                .HasKey(p => new { p.Part, p.PartIssueCode });

            modelBuilder.Entity<PartStructure>()
                .HasKey(p => new { p.Part, p.Task, p.Component });

            modelBuilder.Entity<PartTest>()
                .HasKey(p => new { p.Part, p.PartIssue });

            modelBuilder.Entity<PartPropertyData>()
                .HasKey(p => new { p.Part, p.Property });

            // Primary key for PartMap
            modelBuilder.Entity<PartMap>()
                .HasKey(p => p.MapId);

            // ✅ NEW: LISFPAUser mapping
            modelBuilder.Entity<LISFPAUser>(entity =>
            {
                entity.ToTable("LISFPAUser");

                entity.HasKey(e => e.UserId);

                entity.Property(e => e.Username)
                      .IsRequired()
                      .HasMaxLength(50);

                entity.Property(e => e.PasswordHash)
                      .IsRequired()
                      .HasMaxLength(255);

                entity.Property(e => e.Role)
                      .HasMaxLength(50)
                      .HasDefaultValue("User");

                entity.Property(e => e.IsActive)
                      .HasDefaultValue(true);

                entity.Property(e => e.CreatedAt)
                      .HasDefaultValueSql("SYSDATETIME()");
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
