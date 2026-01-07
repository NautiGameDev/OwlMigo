using Microsoft.EntityFrameworkCore;
using OwlMigo.Data;
using OwlMigo.DTOs.Interest;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Repositories
{
    public class InterestRepo : IInterestRepo
    {
        private readonly ApplicationDbContext dbContext;

        public InterestRepo(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Interest> CreateInterest(InterestDto interestDto)
        {
            Interest newInterest = new Interest
            {
                Name = interestDto.Name,
            };

            await dbContext.Interests.AddAsync(newInterest);
            await dbContext.SaveChangesAsync();

            return newInterest;
        }

        public async Task<Interest> DeleteInterest(int id)
        {
            Interest interest = await dbContext.Interests.FirstOrDefaultAsync(x => x.Id == id);

            if (interest == null)
            {
                return null;
            }

            dbContext.Interests.Remove(interest);
            await dbContext.SaveChangesAsync();

            return interest;
        }

        public async Task<Interest> GetInterestById(int id)
        {
            return await dbContext.Interests.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Interest>> GetAllInterests()
        {
            return await dbContext.Interests.OrderBy(p => p.Name).ToListAsync();
        }

        public async Task<Interest> UpdateInterest(int id, InterestDto interestDto)
        {
            Interest interest = await dbContext.Interests.FirstOrDefaultAsync(x => x.Id == id);

            interest.Name = interestDto.Name;

            await dbContext.SaveChangesAsync();

            return interest;
        }
    }
}
