using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using OwlMigo.DTOs.Interest;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{
    [Route("api/interest")]
    [ApiController]
    public class InterestController : ControllerBase
    {
        private readonly IInterestRepo interestRepo;

        public InterestController(IInterestRepo interestRepo)
        {
            this.interestRepo = interestRepo;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateInterest([FromBody] InterestDto interestDto)
        {
            Interest interest = await interestRepo.CreateInterest(interestDto);

            if (interest == null)
            {
                return BadRequest("Error creating new interest");
            }

            return Ok(interest);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetInterest([FromRoute] int id)
        {
            Interest interest = await interestRepo.GetInterestById(id);

            if (interest == null)
            {
                return BadRequest("Failed to fetch interest from database");
            }

            return Ok(interest);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllInterests()
        {
            List<Interest> interests = await interestRepo.GetAllInterests();

            if (interests.Count == 0)
            {
                return BadRequest("List of interests returned null");
            }

            return Ok(interests);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteInterest([FromRoute] int id)
        {
            Interest interest = await interestRepo.DeleteInterest(id);

            if (interest == null)
            {
                return NotFound("Interest couldn't be found in database");
            }

            return Ok(interest);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateInterest([FromRoute] int id, [FromBody] InterestDto interestDto)
        {
            Interest interest = await interestRepo.UpdateInterest(id, interestDto);

            if (interest == null)
            {
                return NotFound("Failed to update interest. Couldn't be found in database");
            }

            return Ok(interest);
        }
    }
}
