using System.Security.Claims;
using API.Dtos;
using API.Errors;
using API.Extentions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager,
                                 SignInManager<AppUser> signInManager,
                                 ITokenService tokenService,
                                 IMapper mapper)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto login)
        {
            var user = await _userManager.FindByEmailAsync(login.Email);

            if (user == null) return Unauthorized(new ApiResponse(401));

            var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = _tokenService.GenerateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            var user = new AppUser
            {
                Email = registerDto.Email,
                DisplayName = registerDto.DisplayName,
                UserName = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded) return BadRequest(new ApiResponse(400));

            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = _tokenService.GenerateToken(user)
            };
        }

        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> TestAuth()
        {
            return "Test Auth Data";
        }

        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUserAsync()
        {
            var email = HttpContext.User?.Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.Email).Value;

            var user = await _userManager.FindByEmailAsync(email);

            return new UserDto
            {
                Email = user.Email,
                DisplayName = user.DisplayName,
                Token = _tokenService.GenerateToken(user)
            }; 
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailAlreadyExists([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        [HttpGet("address")]
        [Authorize]
        public async Task<ActionResult<AddressDto>> GetUserAddress()
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.Email).Value;

            var user = await _userManager.FindUserAddressFromEmailAsync(HttpContext.User);

            return _mapper.Map<Address,AddressDto>(user.Address);
            //return Ok(userAddres);
            
        }


        [HttpPut("address")]
        [Authorize]
        public async Task<ActionResult<AddressDto>> UpdateUserAddress([FromBody] AddressDto addressDto)
        {
            //var email = HttpContext.User?.Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.Email).Value;

            var user = await _userManager.FindUserAddressFromEmailAsync(HttpContext.User);

            user.Address  = _mapper.Map<AddressDto,Address>(addressDto);

            var result = await _userManager.UpdateAsync(user);

            if(result.Succeeded) return addressDto;

            return BadRequest("Problem in updating user address");
            //return Ok(userAddres);
            
        }


    }
}