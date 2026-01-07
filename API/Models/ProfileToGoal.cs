using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OwlMigo.Models
{
    [Table("ProfileToGoal")]
    public class ProfileToGoal
    {
        public int Id { get; set; }
        [Required]
        public int ProfileId { get; set; }
        [Required]
        public int GoalId { get; set; }

        [ForeignKey("GoalId")]
        public virtual Goal? Goal { get; set; }
    }
}
