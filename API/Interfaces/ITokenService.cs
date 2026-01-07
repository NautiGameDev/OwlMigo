using OwlMigo.Models;

namespace OwlMigo.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(Account account);
    }
}
