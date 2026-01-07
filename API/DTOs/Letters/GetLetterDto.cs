using System.ComponentModel.DataAnnotations;

namespace OwlMigo.DTOs.Letters
{
    public class GetLetterDto
    {
        public int Id { get; set; }
        public string SenderName { get; set; }
        public string ReceiverName { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public DateTime TimeSent { get; set; }
    }
}
