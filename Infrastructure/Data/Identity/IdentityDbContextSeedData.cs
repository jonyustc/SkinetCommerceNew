using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Data.Identity
{
    public class IdentityDbContextSeedData
    {
        public static async Task IdentitySeedAsync(UserManager<AppUser> userManager)
        {
            if(!userManager.Users.Any()){
            var user = new AppUser
            {
                DisplayName = "Pervez",
                Email = "pervez@test.com",
                UserName = "pervez@test.com",
                Address = new Address{
                    FirstName = "pervez",
                    LastName = "jony",
                    Street = "10 street road",
                    City = "New York",
                    ZipCode = "4000"
                }
            };

            await userManager.CreateAsync(user,"Pa$$w0rd");

            }




        }
    }
}