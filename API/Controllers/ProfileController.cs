using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OwlMigo.DTOs.Profile;
using OwlMigo.DTOs.Search;
using OwlMigo.Interfaces;
using OwlMigo.Mappers;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{
    [Route("api/profiles")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly UserManager<Account> userManager;
        private readonly IProfileRepo profileRepo;

        public ProfileController(IProfileRepo profileRepo, UserManager<Account> userManager)
        {
            this.profileRepo = profileRepo;
            this.userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetProfile()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (idClaim == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            Profile profile = await profileRepo.GetProfile(idClaim.Value);

            if (profile == null)
            {
                return NotFound("Failed ot retrieve profile");
            }

            return Ok(profile.ToCreateProfileDto());
        }

        [HttpPost("search")]
        [Authorize]
        public async Task<IActionResult> SearchProfiles([FromBody] SearchDto searchDto)
        {
            var claimId = User.FindFirst(ClaimTypes.NameIdentifier);

            if (claimId == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            Profile userProfile = await profileRepo.GetProfile(claimId.Value);

            if (userProfile == null)
            {
                return NotFound("Coudln't find profile for active user");
            }

            bool isLookingForRomance = userProfile.Goals
                .Any(pg => pg.Goal.Name.Equals("Romance", StringComparison.OrdinalIgnoreCase));
            
            List<Profile> profiles = await profileRepo.SearchProfiles(searchDto, isLookingForRomance);

            return Ok(profiles.Select(p => p.ToResultDto()).ToList());

        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetProfileById([FromRoute] int id)
        {
            Profile profile = await profileRepo.GetProfileById(id);

            if (profile == null)
            {
                return NotFound("Profile not found in database");
            }

            //Handle full name hiding
            if (profile.HideName)
            {
                profile.FirstName = "";
                profile.LastName = "";
            }

            return Ok(profile.ToCreateProfileDto());
        }

        [HttpGet("user/{username}")]
        [Authorize]
        public async Task<IActionResult> GetProfileByUsername([FromRoute] string username)
        {
            var account = await userManager.Users.FirstOrDefaultAsync(x => x.UserName == username);

            if (account == null)
            {
                return NotFound("User account couldn't be retrieved");
            }

            Profile profile = await profileRepo.GetProfile(account.Id);

            if (profile == null)
            {
                return NotFound("User profile couldn't be retrieved");
            }

            if (profile.HideName)
            {
                profile.FirstName = "";
                profile.LastName = "";
            }

            return Ok(profile.ToGetProfileDto());
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateProfile([FromBody] CreateProfileDto profileDto)
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (idClaim == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            Profile profile = await profileRepo.CreateProfile(idClaim.Value, profileDto);

            if (profile == null)
            {
                return BadRequest("Failed to create profile");
            }

            return Ok(profile.ToCreateProfileDto());
        }


        [HttpPut]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] CreateProfileDto profileDto)
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (idClaim == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            Profile profile = await profileRepo.UpdateProfile(idClaim.Value, profileDto);

            if (profile == null)
            {
                return BadRequest("Failed to Update profile");
            }

            return Ok(profile.ToCreateProfileDto());
        }
    }
}
