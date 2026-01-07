using OwlMigo.DTOs.Letters;
using OwlMigo.Models;

namespace OwlMigo.Mappers
{
    public static class LetterMapper
    {
        public static GetLetterDto ToGetLetterDto(this Letter letter)
        {
            return new GetLetterDto
            {
                Id = letter.Id,
                SenderName = letter.SenderName,
                ReceiverName = letter.ReceiverName,
                Subject = letter.Subject,
                Content = letter.Content,
                TimeSent = letter.TimeSent,
            };
        }
    }
}
