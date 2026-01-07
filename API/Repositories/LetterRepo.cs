using Microsoft.EntityFrameworkCore;
using OwlMigo.Data;
using OwlMigo.DTOs.Letters;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Repositories
{
    public class LetterRepo : ILettersRepo
    {
        private readonly ApplicationDbContext dbContext;

        public LetterRepo(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Letter> CreateLetter(int senderId, int receiverId, NewLetterDto letterDto)
        {
            Letter letter = new Letter
            {
                ReceiverId = receiverId,
                ReceiverName = letterDto.ReceiverName,
                SenderId = senderId,
                SenderName = letterDto.SenderName,
                Subject = letterDto.Subject,
                Content = letterDto.Content,
                TimeSent = DateTime.UtcNow
            };

            await dbContext.Letters.AddAsync(letter);
            await dbContext.SaveChangesAsync();

            return letter;
        }

        public async Task<Letter> DeleteLetter(int id)
        {
            Letter letter = await dbContext.Letters.FirstOrDefaultAsync(x => x.Id == id);

            if (letter == null)
            {
                return null;
            }

            dbContext.Letters.Remove(letter);
            await dbContext.SaveChangesAsync();

            return letter;
        }

        public async Task<List<Letter>> GetReceivedLetters(int profileId)
        {
            return await dbContext.Letters
                .Where(x => x.ReceiverId == profileId)
                .OrderByDescending(x => x.TimeSent)
                .ToListAsync();            
        }

        public async Task<List<Letter>> GetSentLetters(int profileId)
        {
            return await dbContext.Letters
                .Where(x => x.SenderId == profileId)
                .OrderByDescending(x => x.TimeSent)
                .ToListAsync();
        }
    }
}
