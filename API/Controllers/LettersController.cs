using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using OwlMigo.DTOs.Letters;
using OwlMigo.Interfaces;
using OwlMigo.Mappers;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{
    [Route("api/letters")]
    [ApiController]
    public class LettersController : ControllerBase
    {
        
        private readonly ILettersRepo lettersRepo;
        private readonly IProfileRepo profileRepo;

        public LettersController(ILettersRepo lettersRepo, IProfileRepo profileRepo)
        {            
            this.lettersRepo = lettersRepo;
            this.profileRepo = profileRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateLetter([FromBody] NewLetterDto newLetterDto)
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (idClaim == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            Profile senderProfile = await profileRepo.GetProfile(idClaim.Value);

            if (senderProfile == null)
            {
                return NotFound("Profile couldn't be found with account id");
            }

            Profile receiverProfile = await profileRepo.GetProfileByUsername(newLetterDto.ReceiverName);

            if (receiverProfile == null)
            {
                return NotFound("Receiver profile couldn't be found in database");
            }

            Letter letter = await lettersRepo.CreateLetter(senderProfile.Id, receiverProfile.Id, newLetterDto);

            if (letter == null)
            {
                return BadRequest("Error creating new letter");
            }

            return Ok(letter);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteLetter([FromRoute] int id)
        {
            Letter deletedLetter = await lettersRepo.DeleteLetter(id);

            if (deletedLetter == null)
            {
                return NotFound("Letter couldn't be found in database");
            }

            return Ok(deletedLetter);
        }

        [HttpGet("inbound")]
        [Authorize]
        public async Task<IActionResult> GetReceivedLetters()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (idClaim == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            Profile profile = await profileRepo.GetProfile(idClaim.Value);

            if (profile == null)
            {
                return NotFound("Profile couldn't be found with account id");
            }

            List<Letter> letters = await lettersRepo.GetReceivedLetters(profile.Id);

            return Ok(letters.Select(x => x.ToGetLetterDto()).ToList());
        }

        [HttpGet("outbound")]
        [Authorize]
        public async Task<IActionResult> GetSentLetters()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (idClaim == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            Profile profile = await profileRepo.GetProfile(idClaim.Value);

            if (profile == null)
            {
                return NotFound("Profile couldn't be found with account id");
            }

            List<Letter> letters = await lettersRepo.GetSentLetters(profile.Id);

            return Ok(letters.Select(x => x.ToGetLetterDto()).ToList());
        }
    }
}
