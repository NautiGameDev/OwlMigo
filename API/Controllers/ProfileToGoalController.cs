using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OwlMigo.DTOs.ProfileToGoal;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{
    [Route("api/ProfileToGoal")]
    [ApiController]
    public class ProfileToGoalController : ControllerBase
    {
        private readonly IProfileToGoalRepo profileToGoalRepo;
        private readonly IProfileRepo profileRepo;

        public ProfileToGoalController(IProfileToGoalRepo profileToGoalRepo, IProfileRepo profileRepo)
        {
            this.profileToGoalRepo = profileToGoalRepo;
            this.profileRepo = profileRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateLinks([FromBody] ProfileToGoalDto profileToGoalDto)
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

            List<ProfileToGoal> goalsList = await profileToGoalRepo.CreateLinks(profile.Id, profileToGoalDto);

            if (goalsList.Count < profileToGoalDto.GoalIds.Count)
            {
                return BadRequest("Error completing full list of goals for user");
            }

            return Ok(goalsList);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetLinks([FromRoute] int id)
        {
            List<ProfileToGoal> listOfGoals = await profileToGoalRepo.GetLinksToProfile(id);

            if (listOfGoals == null)
            {
                return NotFound("No goals found for this profile");
            }

            return Ok(listOfGoals);
        }
    }
}
