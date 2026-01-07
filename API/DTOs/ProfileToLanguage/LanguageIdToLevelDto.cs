namespace OwlMigo.DTOs.ProfileToLanguage
{
    public class LanguageIdToLevelDto
    {
        public List<LangIdLevelDto> languageIdLevels {  get; set; }
    }

    public class LangIdLevelDto
    {
        public int LanguageId { get; set; }
        public string Level {  get; set; }
    }
}
