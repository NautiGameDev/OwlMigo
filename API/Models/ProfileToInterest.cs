using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OwlMigo.Models
{
    [Table("ProfileToInterest")]
    public class ProfileToInterest
    {
        public int Id { get; set; }
        [Required]
        public int ProfileId { get; set; }
        [Required]
        public int InterestId { get; set; }

        [ForeignKey("InterestId")]
        public virtual Interest Interest { get; set; }
    }
}
