using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OwlMigo.DTOs.Language;
using OwlMigo.DTOs.ProfileToInterests;
using OwlMigo.DTOs.ProfileToLanguage;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{
    [Route("api/ProfileToLanguage")]
    [ApiController]
    public class ProfileToLanguageController : ControllerBase
    {
        readonly IProfileToLanguageRepo profileToLanguageRepo;
        readonly IProfileRepo profileRepo;
        readonly ILanguageRepo languageRepo;

        public ProfileToLanguageController(IProfileToLanguageRepo profileToLanguageRepo, IProfileRepo profileRepo, ILanguageRepo languageRepo)
        {
            this.profileToLanguageRepo = profileToLanguageRepo;
            this.profileRepo = profileRepo;
            this.languageRepo = languageRepo;
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateLinks([FromBody] ProfileToLanguageDto profileToLanguageDto)
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

            /*Ensures that the language is in the database and retrieves ID for join table.
             If language isn't in the database, create a new row with the language name and retrieve ID
            Else, retrieve the language and use id to populate necessary dto with id-level pair to create entries in join table*/
            List<LangIdLevelDto> langIdsAndLevels = new List<LangIdLevelDto>();
                        
            foreach (LanguageSelectionDto selection in profileToLanguageDto.Languages)
            {
                Language selectedLanguage = await languageRepo.GetLanguageByName(selection.Language);

                //If language doesn't exist in database, create language in table
                if (selectedLanguage == null)
                {
                    selectedLanguage = await languageRepo.AddLanguage(new LanguageDto { Name = selection.Language });
                }

                LangIdLevelDto langIdLevelDto = new LangIdLevelDto
                {
                    LanguageId = selectedLanguage.Id,
                    Level = selection.Level
                };

                langIdsAndLevels.Add(langIdLevelDto);
            }

            LanguageIdToLevelDto languesToAdd = new LanguageIdToLevelDto
            {
                languageIdLevels = langIdsAndLevels
            };

            //Pass newly created dto with objects of IDs and levels to repo to populate the database join table
            List<ProfileToLanguage> languagesList = await profileToLanguageRepo.CreateLinks(profile.Id, languesToAdd);

            if (languagesList.Count < profileToLanguageDto.Languages.Count)
            {
                return BadRequest("Error completing full list of languages for user");
            }

            return Ok (languagesList);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetLinks([FromRoute] int id)
        {
            List<ProfileToLanguage> listOfLanguages = await profileToLanguageRepo.GetLinksToProfile(id);

            if (listOfLanguages == null)
            {
                return NotFound("No languages found for this profile");
            }

            return Ok(listOfLanguages);
        }
    }
}
