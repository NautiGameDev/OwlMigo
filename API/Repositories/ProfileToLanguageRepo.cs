using Microsoft.EntityFrameworkCore;
using OwlMigo.Data;
using OwlMigo.DTOs.ProfileToLanguage;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Repositories
{
    public class ProfileToLanguageRepo : IProfileToLanguageRepo
    {
        private readonly ApplicationDbContext dbContext;

        public ProfileToLanguageRepo(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<List<ProfileToLanguage>> CreateLinks(int profileId, LanguageIdToLevelDto langIdToLevel)
        {
            //Remove all existing links
            var existingLinks = dbContext.ProfileToLanguages.Where(p => p.ProfileId == profileId);
            dbContext.ProfileToLanguages.RemoveRange(existingLinks);

            //Create list of models to be added to database
            var languageLinks = langIdToLevel.languageIdLevels.Select(lang => new ProfileToLanguage
            {
                ProfileId = profileId,
                LanguageId = lang.LanguageId,
                Level = lang.Level
            }).ToList();

            await dbContext.ProfileToLanguages.AddRangeAsync(languageLinks);
            await dbContext.SaveChangesAsync();

            return languageLinks;
        }

        public async Task<List<ProfileToLanguage>> GetLinksToProfile(int profileId)
        {
            return await dbContext.ProfileToLanguages
                .Include(x => x.Language)
                .Where(x => x.ProfileId == profileId)
                .ToListAsync();
        }
    }
}
