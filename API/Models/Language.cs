using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OwlMigo.Models
{
    [Table("Languages")]
    public class Language
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }
    }
}
