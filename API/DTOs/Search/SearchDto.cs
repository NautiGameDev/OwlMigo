namespace OwlMigo.DTOs.Search
{
    public class SearchDto
    {
        public string Username { get; set; } = "Any";
        public string Gender { get; set; } = "Any";
        public int MinAge { get; set; }
        public int MaxAge { get; set; }
        public string Country { get; set; } = "Any";
        public string Language { get; set; } = "Any";
        public string Fluency {  get; set; } = "Any";
        public string LookingFor { get; set; } = "Any";
        public string Interest {  get; set; } = "Any";
        public bool OnlyActive { get; set; } = true;
    }
}
