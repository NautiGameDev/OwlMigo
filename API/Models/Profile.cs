using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OwlMigo.Models
{
    [Table("Profiles")]
    public class Profile
    {
        public int Id { get; set; }
        
        [Required]
        public string AccountId { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }
                
        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        public string Country { get; set; }

        [Required]
        public string Gender { get; set; }
        
        public string? Thumbnail { get; set; }

        public string? Bio { get; set; }
        public bool HideRomance { get; set; } = false;
        public bool HideName { get; set; } = false;

        public DateTime LastLogin { get; set; } = DateTime.UtcNow;

        [ForeignKey("AccountId")]
        public virtual Account Account { get; set; }

        public virtual ICollection<ProfileToLanguage> Languages { get; set; } = null;
        public virtual ICollection<ProfileToGoal> Goals { get; set; } = null;
        public virtual ICollection<ProfileToInterest> Interests { get; set; } = null;
    }
}
