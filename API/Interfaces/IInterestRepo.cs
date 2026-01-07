using OwlMigo.DTOs.Interest;
using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface IInterestRepo
    {
        Task<Interest> CreateInterest(InterestDto interestDto);
        Task<Interest> UpdateInterest(int id, InterestDto interestDto);
        Task<Interest> GetInterestById(int id);
        Task<Interest> DeleteInterest(int id);
        Task<List<Interest>> GetAllInterests();
    }
}
