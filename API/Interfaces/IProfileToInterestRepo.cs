using OwlMigo.DTOs.ProfileToInterests;
using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface IProfileToInterestRepo
    {
        Task<List<ProfileToInterest>> CreateLinks(int profileId, ProfileToInterestDto profToInterestDto);
        
        Task<List<ProfileToInterest>> GetLinksToProfile(int profileId);
    }
}
