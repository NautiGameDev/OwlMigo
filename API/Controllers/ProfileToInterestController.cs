using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OwlMigo.DTOs.ProfileToInterests;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{
    [Route("api/ProfileToInterest")]
    [ApiController]
    public class ProfileToInterestController : ControllerBase
    {
        private readonly IProfileToInterestRepo profileToInterestRepo;
        private readonly IProfileRepo profileRepo;

        public ProfileToInterestController(IProfileToInterestRepo profileToInterestRepo, IProfileRepo profileRepo)
        {
            this.profileToInterestRepo = profileToInterestRepo;
            this.profileRepo = profileRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateLinks([FromBody] ProfileToInterestDto profToInterestsDto)
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (idClaim == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            Profile profile = await profileRepo.GetProfile(idClaim.Value);

            if (profile == null)
            {
                return NotFound("Profile couldn't be found in database");
            }

            List<ProfileToInterest> interestsList = await profileToInterestRepo.CreateLinks(profile.Id, profToInterestsDto);

            if (interestsList.Count < profToInterestsDto.InterestIds.Count)
            {
                return BadRequest("Error completing full list of interests for user");
            }

            return Ok(interestsList);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetLinks([FromRoute] int id)
        {
            List<ProfileToInterest> listOfInterests = await profileToInterestRepo.GetLinksToProfile(id);

            if (listOfInterests == null)
            {
                return NotFound("No interests found for this profile");
            }

            return Ok(listOfInterests);
        }

    }
}
