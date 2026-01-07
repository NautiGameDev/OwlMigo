

namespace OwlMigo.DTOs.ProfileToLanguage
{
    public class ProfileToLanguageDto
    {
        public List<LanguageSelectionDto> Languages { get; set; }
    }

    public class LanguageSelectionDto
    {
        public string Language { get; set; }
        public string Level { get; set; }
    }
}


