using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OwlMigo.Models;

namespace OwlMigo.Data
{
    public class ApplicationDbContext : IdentityDbContext<Account>
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions) 
        {

        }

        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Interest> Interests { get; set; }
        public DbSet<ProfileToInterest> ProfileToInterests { get; set; }
        public DbSet<Language> Languages { get; set; }
        public DbSet<ProfileToLanguage> ProfileToLanguages { get; set; }
        public DbSet<Goal> Goals { get; set; }
        public DbSet<ProfileToGoal> ProfileToGoals { get; set; }
        public DbSet<Letter> Letters { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Id = "1c44257b-cb83-4cd7-be7e-b90cf8d13e66",
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
                new IdentityRole
                {
                    Id = "4cf48e40-bd1c-478b-be12-40ccc232fe61",
                    Name = "User",
                    NormalizedName = "USER"
                }
            };

            

            builder.Entity<IdentityRole>().HasData(roles);
        }
    }
}
