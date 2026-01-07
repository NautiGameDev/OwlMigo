using System.ComponentModel.DataAnnotations;

namespace OwlMigo.DTOs.Profile
{
    public class CreateProfileDto
    {
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Country { get; set; }
        public string Gender { get; set; }

        public string? Thumbnail { get; set; }

        public string? Bio { get; set; }

        public bool HideRomance { get; set; } = false;
        public bool HideName { get; set; } = false;
        public DateTime LastLogin { get; set; }
    }
}
