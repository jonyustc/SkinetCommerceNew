using System.Text;
using Core.Entities.Identity;
using Infrastructure.Data.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extentions
{
    public static class IdentityServicesExtention
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,IConfiguration config)
        {
            var builder = services.AddIdentityCore<AppUser>();
            builder = new IdentityBuilder(builder.UserType,builder.Services);
            builder.AddEntityFrameworkStores<AppIdentityDbContext>();
            builder.AddSignInManager<SignInManager<AppUser>>();
            
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opts =>{
                
                opts.TokenValidationParameters = new TokenValidationParameters{
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])),
                    ValidIssuer = config["Token:Issuer"],
                    ValidateIssuer = true,
                    ValidateAudience = false
                };
                
            });

            return services;
        }
    }
}