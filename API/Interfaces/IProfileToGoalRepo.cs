using OwlMigo.DTOs.ProfileToGoal;
using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface IProfileToGoalRepo
    {
        Task<List<ProfileToGoal>> CreateLinks(int profileId, ProfileToGoalDto profileToGoalDto);
        Task<List<ProfileToGoal>> GetLinksToProfile(int profileId);
    }
}
