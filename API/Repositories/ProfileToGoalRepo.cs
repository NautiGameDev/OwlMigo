using Microsoft.EntityFrameworkCore;
using OwlMigo.Data;
using OwlMigo.DTOs.ProfileToGoal;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Repositories
{
    public class ProfileToGoalRepo : IProfileToGoalRepo
    {
        private readonly ApplicationDbContext dbContext;

        public ProfileToGoalRepo(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<ProfileToGoal>> CreateLinks(int profileId, ProfileToGoalDto profileToGoalDto)
        {
            //Remove all existing links
            var existingLinks = dbContext.ProfileToGoals.Where(p => p.ProfileId == profileId);
            dbContext.ProfileToGoals.RemoveRange(existingLinks);

            var goalLinks = profileToGoalDto.GoalIds.Select(id => new ProfileToGoal
            {
                ProfileId = profileId,
                GoalId = id,
            }).ToList();

            await dbContext.ProfileToGoals.AddRangeAsync(goalLinks);
            await dbContext.SaveChangesAsync();

            return goalLinks;
        }

        public async Task<List<ProfileToGoal>> GetLinksToProfile(int profileId)
        {
            return await dbContext.ProfileToGoals
                .Include(x => x.Goal)
                .Where(x => x.ProfileId == profileId)
                .ToListAsync();
        }
    }
}
