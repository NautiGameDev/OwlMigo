using System.Data;
using Microsoft.EntityFrameworkCore;
using OwlMigo.Data;
using OwlMigo.DTOs.ProfileToInterests;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Repositories
{
    public class ProfileToInterestRepo : IProfileToInterestRepo
    {

        private readonly ApplicationDbContext dbContext;

        public ProfileToInterestRepo(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<ProfileToInterest>> CreateLinks(int profileId, ProfileToInterestDto profToInterestDto)
        {
            //Remove all existing links
            var existingLinks = dbContext.ProfileToInterests.Where(p => p.ProfileId == profileId);
            dbContext.ProfileToInterests.RemoveRange(existingLinks);

            //Create list of models to be added to database
            var interestLinks = profToInterestDto.InterestIds.Select(id => new ProfileToInterest
            {
                ProfileId = profileId,
                InterestId = id,
            }).ToList();

            await dbContext.ProfileToInterests.AddRangeAsync(interestLinks);
            await dbContext.SaveChangesAsync();

            return interestLinks;
        }

        public async Task<List<ProfileToInterest>> GetLinksToProfile(int profileId)
        {
            return await dbContext.ProfileToInterests
                .Include(x => x.Interest)
                .Where(x => x.ProfileId == profileId).
                ToListAsync();
        }
    }
}
