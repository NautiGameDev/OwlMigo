using OwlMigo.DTOs.Language;
using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface ILanguageRepo
    {
        public Task<Language> AddLanguage(LanguageDto languageDto);
        public Task<Language> GetLanguage(int id);
        public Task<Language> GetLanguageByName(string languageName);
        public Task<List<Language>> GetAllLanguages();
        public Task<Language> DeleteLanguage(int id);
        public Task<Language> UpdateLanguage(int id, LanguageDto languageDto);
    }
}
