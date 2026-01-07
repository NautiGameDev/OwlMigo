using Microsoft.EntityFrameworkCore;
using OwlMigo.Data;
using OwlMigo.DTOs.Language;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Repositories
{
    public class LanguageRepo : ILanguageRepo
    {
        private readonly ApplicationDbContext dbContext;

        public LanguageRepo(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Language> AddLanguage(LanguageDto languageDto)
        {
            Language language = new Language
            {
                Name = languageDto.Name,
            };

            await dbContext.Languages.AddAsync(language);
            await dbContext.SaveChangesAsync();

            return language;
        }

        public async Task<Language> DeleteLanguage(int id)
        {
            Language language = await dbContext.Languages.FirstOrDefaultAsync(x => x.Id == id);

            if (language == null)
            {
                return null;
            }

            dbContext.Remove(language);
            await dbContext.SaveChangesAsync();

            return language;
        }

        public async Task<Language> GetLanguage(int id)
        {
            return await dbContext.Languages.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Language> GetLanguageByName(string languageName)
        {
            return await dbContext.Languages.FirstOrDefaultAsync(x => x.Name == languageName);
        }

        public async Task<List<Language>> GetAllLanguages()
        {
            return await dbContext.Languages.OrderBy(x => x.Name).ToListAsync();
        }

        public async Task<Language> UpdateLanguage(int id, LanguageDto languageDto)
        {
            Language language = await dbContext.Languages.FirstOrDefaultAsync(x => x.Id == id);

            if (language == null)
            {
                return null;
            }

            language.Name = languageDto.Name;

            await dbContext.SaveChangesAsync();

            return language;
        }
    }
}
