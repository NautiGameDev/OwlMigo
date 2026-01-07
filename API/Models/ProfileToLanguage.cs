using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OwlMigo.Models
{
    [Table("ProfileToLanguages")]
    public class ProfileToLanguage
    {
        public int Id { get; set; }
        [Required]
        public int ProfileId { get; set; }
        [Required]
        public int LanguageId { get; set; }

        [Required]
        public string? Level {  get; set; }

        [ForeignKey("LanguageId")]
        public virtual Language? Language { get; set; }
    }
}
