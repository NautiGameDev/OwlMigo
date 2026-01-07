using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using OwlMigo.Data;
using OwlMigo.DTOs.Profile;
using OwlMigo.DTOs.Search;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Repositories
{
    public class ProfileRepo : IProfileRepo
    {
        private readonly ApplicationDbContext dbContext;
        private readonly UserManager<Account> userManager;

        public ProfileRepo(ApplicationDbContext dbContext, UserManager<Account> userManager)
        {
            this.dbContext = dbContext;
            this.userManager = userManager;
        }

        public async Task<Profile> CreateProfile(string accountId, CreateProfileDto profileDto)
        {
            Profile profile = new Profile
            {
                AccountId = accountId,
                FirstName = profileDto.FirstName,
                LastName = profileDto.LastName,
                DateOfBirth = profileDto.DateOfBirth,
                Country = profileDto.Country,
                Gender = profileDto.Gender,
                Thumbnail = profileDto.Thumbnail,
                Bio = profileDto.Bio,
                LastLogin = DateTime.UtcNow,
                HideName = profileDto.HideName,
                HideRomance = profileDto.HideRomance
            };

            await dbContext.Profiles.AddAsync(profile);
            await dbContext.SaveChangesAsync();

            return profile;
        }

        public async Task<Profile> GetProfile(string accountId)
        {
            return await dbContext.Profiles
                .Include(pg => pg.Goals)
                .ThenInclude(pg => pg.Goal)
                .Include(pi => pi.Interests)
                .ThenInclude(pi => pi.Interest)
                .Include(pl => pl.Languages)
                .ThenInclude(pl => pl.Language)
                .FirstOrDefaultAsync(x => x.AccountId == accountId);
        }

        public async Task<Profile> GetProfileById(int id)
        {
            return await dbContext.Profiles.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Profile> GetProfileByUsername(string username)
        {
            return await dbContext.Profiles.FirstOrDefaultAsync(x => x.Account.UserName == username);
        }

        public async Task<List<Profile>> SearchProfiles(SearchDto searchDto, bool isLookingForRomance)
        {
            var query = dbContext.Profiles.AsQueryable();

            //Hides users who wish to be hidden from users looking for romance on platform
            if (isLookingForRomance)
            {
                query = query.Where(p => p.HideRomance == false);
            }

            var today = DateTime.UtcNow;

            if (searchDto.OnlyActive)
            {
                var minLastLogin = today.AddMonths(-1);
                query = query.Where(p => p.LastLogin >= minLastLogin);
            }

            if (searchDto.Username != "Any")
            {
                query = query.Where(p => p.Account.UserName.ToLower().Contains(searchDto.Username.ToLower()));
            }

            if (searchDto.Gender != "Any")
            {
                query = query.Where(p => p.Gender ==  searchDto.Gender);
            }

            if (searchDto.Country != "Any")
            {
                query = query.Where(p => p.Country == searchDto.Country);
            }


            //Apply age filters by taking the current time and subtracting the years accordingly, then comparing to birth date.
            
            if (searchDto.MinAge > 0)
            {
                var minBirthdate = today.AddYears(-searchDto.MinAge);
                query = query.Where(p => p.DateOfBirth <= minBirthdate);
            }
            if (searchDto.MaxAge > 0)
            {
                var maxBirthDate = today.AddYears(-searchDto.MaxAge - 1);
                query = query.Where(p => p.DateOfBirth >= maxBirthDate);
            }


            if (searchDto.Language != "Any")
            {
                query = query.Where(p => p.Languages.Any(pl =>
                pl.Language.Name == searchDto.Language && 
                (searchDto.Fluency == "Any" || pl.Level == searchDto.Fluency)));
            }

            if (searchDto.Interest != "Any")
            {
                query = query.Where(p => p.Interests.Any(pi => pi.Interest.Name == searchDto.Interest));
            }

            if (searchDto.LookingFor != "Any")
            {
                query = query.Where(p => p.Goals.Any(pg => pg.Goal.Name == searchDto.LookingFor));
            }

            return await query
               .Include(p => p.Account)
               .Include(pg => pg.Goals).ThenInclude(g => g.Goal)
               .ToListAsync();
        }

        public async Task<Profile> UpdateProfile(string accountId, CreateProfileDto profileDto)
        {
            Profile profile = await dbContext.Profiles.FirstOrDefaultAsync(x => x.AccountId == accountId);

            if (profile == null)
            {
                return null;
            }

            profile.FirstName = profileDto.FirstName;
            profile.LastName = profileDto.LastName;
            profile.DateOfBirth = profileDto.DateOfBirth;
            profile.Country = profileDto.Country;
            profile.Gender = profileDto.Gender;
            profile.Thumbnail = profileDto.Thumbnail;
            profile.Bio = profileDto.Bio;
            profile.LastLogin = DateTime.UtcNow;
            profile.HideName = profileDto.HideName;
            profile.HideRomance = profileDto.HideRomance;
                        
            await dbContext.SaveChangesAsync();

            return profile;
        }
    }
}
