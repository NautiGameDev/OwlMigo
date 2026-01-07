using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OwlMigo.DTOs.Account;
using OwlMigo.DTOs.Profile;
using OwlMigo.Interfaces;
using OwlMigo.Mappers;
using OwlMigo.Models;

namespace OwlMigo.Controllers
{

    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        //Dependency Injection
        private readonly UserManager<Account> userManager;
        private readonly ITokenService tokenService;
        private readonly SignInManager<Account> signInManager;
        private readonly IProfileRepo profileRepo;
        

        public AccountController(UserManager<Account> userManager, ITokenService tokenService, SignInManager<Account> signInManager, IProfileRepo profileRepo)
        {
            this.userManager = userManager;
            this.tokenService = tokenService;
            this.signInManager = signInManager;
            this.profileRepo = profileRepo;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //Validate user by email
            var account = await userManager.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email);

            if (account == null)
            {
                return NotFound("User account doesn't exist at that email address.");
            }

            var result = await signInManager.CheckPasswordSignInAsync(account, loginDto.Password, false);

            if (!result.Succeeded)
            {
                return Unauthorized("Account email/password combination is incorrect");
            }

            //Update last login
            Profile profile = await profileRepo.GetProfile(account.Id);

            if (profile != null)
            {
                CreateProfileDto profileDto = profile.ToCreateProfileDto();
                profileDto.LastLogin = DateTime.UtcNow;
                Profile updatedProfile = await profileRepo.UpdateProfile(account.Id, profileDto);
            }

            return Ok(
                new NewUserDto
                {
                    Username = account.UserName,
                    Email = account.Email,
                    Token = await tokenService.CreateToken(account)
                });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var account = new Account
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                };

                var createdAccount = await userManager.CreateAsync(account, registerDto.Password);

                if (createdAccount.Succeeded)
                {
                    //Default to user role
                    await userManager.AddToRoleAsync(account, "User");

                    return Ok(
                    new NewUserDto
                    {
                        Username = account.UserName,
                        Email = account.Email,
                        Token = await tokenService.CreateToken(account)
                    });

                }
                else
                {
                    var errorMessages = createdAccount.Errors.Select(e => e.Description);
                    return BadRequest(errorMessages);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetUsername()
        {
            var idClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (idClaim == null)
            {
                return Unauthorized("Account ID not found in token");
            }

            var user = await userManager.FindByIdAsync(idClaim.Value);            

            if (user == null)
            {
                return NotFound("Unable to match user Id to account Id");
            }

            Profile profile = await profileRepo.GetProfile(idClaim.Value);
            string thumbnailPath = "OwlMigo_Beret.jpg"; //Default thumbnail in case thumbnail cant be retrieved

            if (profile != null)
            {
                thumbnailPath = profile.Thumbnail;
            }

            return Ok(new { Username = user.UserName, Thumbnail = thumbnailPath });
        }
    }
}
