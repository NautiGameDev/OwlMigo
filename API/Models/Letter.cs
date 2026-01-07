using System.ComponentModel.DataAnnotations.Schema;

namespace OwlMigo.Models
{
    [Table("Letters")]
    public class Letter
    {
        public int Id { get; set; }
        public int ReceiverId { get; set; }
        public string ReceiverName { get; set; }
        public int SenderId { get; set; }
        public string SenderName { get; set; }
        public string Subject { get; set; }
        public string Content { get; set; }
        public DateTime TimeSent { get; set; }
    }
}
