using System.ComponentModel.DataAnnotations;

namespace OwlMigo.DTOs.Letters
{
    public class NewLetterDto
    {        
        [Required]
        public string ReceiverName { get; set; }
        [Required]
        public string SenderName { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
