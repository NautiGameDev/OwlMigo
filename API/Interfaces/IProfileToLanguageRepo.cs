using OwlMigo.DTOs.ProfileToInterests;
using OwlMigo.DTOs.ProfileToLanguage;
using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface IProfileToLanguageRepo
    {
        Task<List<ProfileToLanguage>> CreateLinks(int profileId, LanguageIdToLevelDto langIdToLevel);

        Task<List<ProfileToLanguage>> GetLinksToProfile(int profileId);
    }
}
