using Microsoft.OpenApi.Services;
using OwlMigo.DTOs.Helpers;
using OwlMigo.DTOs.Profile;
using OwlMigo.DTOs.Search;
using OwlMigo.Models;

namespace OwlMigo.Mappers
{
    public static class ProfileMapper
    {
        public static CreateProfileDto ToCreateProfileDto(this Profile profile)
        {
            return new CreateProfileDto
            {
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                DateOfBirth = profile.DateOfBirth,
                Country = profile.Country,
                Gender = profile.Gender,
                Thumbnail = profile.Thumbnail,
                Bio = profile.Bio,
                HideName = profile.HideName,
                HideRomance = profile.HideRomance
            };
        }

        public static GetProfileDto ToGetProfileDto(this Profile profile)
        {
            return new GetProfileDto
            {
                Id = profile.Id,
                FirstName = profile.FirstName,
                LastName = profile.LastName,
                DateOfBirth = profile.DateOfBirth,
                Country = profile.Country,
                Gender = profile.Gender,
                Thumbnail = profile.Thumbnail,
                Bio = profile.Bio,
                HideName = profile.HideName,
                HideRomance = profile.HideRomance,
                LastLogin = profile.LastLogin,
                Goals = profile.Goals.Select(pg => new GoalData
                {
                    Id = pg.Goal.Id,
                    Name = pg.Goal.Name
                }).ToList(),
                Interests = profile.Interests.Select(pi => new InterestData
                {
                    Id = pi.Id,
                    Name = pi.Interest.Name
                }).ToList(),
                Languages = profile.Languages.Select(pl => new LanguageData
                {
                    Id = pl.Id,
                    Name = pl.Language.Name,
                    Level = pl.Level
                }).ToList()
            };
        }

        public static ResultDto ToResultDto(this Profile profile)
        {
            return new ResultDto
            {
                Username = profile.Account.UserName,
                Id = profile.Id,
                FirstName = profile.HideName ? "" : profile.FirstName,
                LastName = profile.HideName ? "" : profile.LastName,
                DateOfBirth = profile.DateOfBirth,
                Country = profile.Country,
                Gender = profile.Gender,
                Thumbnail = profile.Thumbnail,
                Bio = profile.Bio,
                LastLogin = profile.LastLogin,
                Goals = profile.Goals.Select(pg => new GoalData
                {
                    Id = pg.Goal.Id,
                    Name = pg.Goal.Name
                }).ToList()
            };
        }
    }
}
