
using OwlMigo.DTOs.Helpers;

namespace OwlMigo.DTOs.Search
{
    public class ResultDto
    {
        public int Id { get; set; }
        public string Username {  get; set; }
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Country { get; set; }
        public string Gender { get; set; }

        public string? Thumbnail { get; set; }

        public string? Bio { get; set; }

        public DateTime LastLogin { get; set; }

        public List<GoalData> Goals { get; set; }
    }
}
