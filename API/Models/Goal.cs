using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OwlMigo.Models
{
    [Table("Goals")]
    public class Goal
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
    }
}
