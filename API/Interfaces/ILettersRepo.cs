using OwlMigo.DTOs.Letters;
using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface ILettersRepo
    {
        Task<Letter> CreateLetter(int senderId, int receiverId, NewLetterDto letterDto);

        Task<List<Letter>> GetReceivedLetters(int profileId);

        Task<List<Letter>> GetSentLetters(int profileId);

        Task<Letter> DeleteLetter(int id);
    }
}
