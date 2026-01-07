using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OwlMigo.Models
{
    [Table("Interests")]
    public class Interest
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }
    }
}
