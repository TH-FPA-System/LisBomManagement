using Microsoft.EntityFrameworkCore;
using LISBOMWebAPI.Models;

namespace LISBOMWebAPI.Data
{
    public class BOMDbContext : DbContext
    {
        public BOMDbContext(DbContextOptions<BOMDbContext> options) : base(options) { }

        public DbSet<Part> Parts { get; set; }
        public DbSet<PartIssue> PartIssues { get; set; }
        public DbSet<PartStructure> PartStructures { get; set; }
        public DbSet<PartTest> PartTests { get; set; }
        public DbSet<PartPropertyData> PartPropertyDatas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PartIssue>()
                .HasKey(p => new { p.Part, p.PartIssueCode });

            modelBuilder.Entity<PartStructure>()
                .HasKey(p => new { p.Part, p.Task, p.TaskReference, p.Component, p.EffStart, p.EffClose });

            modelBuilder.Entity<PartTest>()
                .HasKey(p => new { p.Part, p.PartIssue });

            modelBuilder.Entity<PartPropertyData>()
                .HasKey(p => new { p.Part, p.Property });
        }
    }



}
