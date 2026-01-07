using OwlMigo.DTOs.Profile;
using OwlMigo.DTOs.Search;
using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface IProfileRepo
    {
        Task<Profile> CreateProfile(string accountId, CreateProfileDto profileDto);

        Task<Profile> GetProfile(string accountId);

        Task<Profile> GetProfileById(int id);

        Task<Profile> GetProfileByUsername(string username);

        Task<List<Profile>> SearchProfiles(SearchDto searchDto, bool isLookingForRomance);

        Task<Profile> UpdateProfile(string accountId, CreateProfileDto profileDto);
    }
}
