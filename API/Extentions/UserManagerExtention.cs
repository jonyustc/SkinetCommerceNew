using System.Security.Claims;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extentions
{
    public static class UserManagerExtention
    {
        public static async Task<AppUser> FindUserAddressFromEmailAsync(this UserManager<AppUser> input,ClaimsPrincipal user)
        {
            var email = user?.Claims?.FirstOrDefault(x=>x.Type == ClaimTypes.Email)?.Value;

            return await input.Users.Include(x=>x.Address).SingleOrDefaultAsync(x=>x.Email == email);

           // return userWithAddress;
        }
    }
}