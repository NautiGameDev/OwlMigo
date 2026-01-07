using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OwlMigo.DTOs.Language;
using OwlMigo.Interfaces;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{
    [Route("api/language")]
    [ApiController]
    public class LanguageController : ControllerBase
    {
        private readonly ILanguageRepo languageRepo;

        public LanguageController(ILanguageRepo languageRepo)
        {
            this.languageRepo = languageRepo;
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateLanguage([FromBody] LanguageDto languageDto)
        {
            Language language = await languageRepo.AddLanguage(languageDto);

            if (language == null)
            {
                return BadRequest("Error creating new language");
            }

            return Ok(language);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLanguage([FromRoute] int id)
        {
            Language language = await languageRepo.GetLanguage(id);

            if (language == null)
            {
                return NotFound("Language couldn't be found in database");
            }

            return Ok(language);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLanguages()
        {
            List<Language> languages = await languageRepo.GetAllLanguages();

            if (languages == null)
            {
                return BadRequest("Failed to fetch languages from database");
            }    

            return Ok(languages);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteLanguage([FromRoute] int id)
        {
            Language language = await languageRepo.DeleteLanguage(id);

            if (language == null)
            {
                return NotFound("Language couldn't be found in database");
            }

            return Ok(language);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateLanguage([FromRoute] int id, [FromBody] LanguageDto languageDto)
        {
            Language language = await languageRepo.UpdateLanguage(id, languageDto);

            if (language == null)
            {
                return NotFound("Language couldn't be found in database.");
            }

            return Ok(language);
        }
    }
}
