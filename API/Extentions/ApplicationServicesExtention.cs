using API.Helpers;
using Core.Interfaces;
using Infrastructure.Data.Repositories;
using Infrastructure.Services;

namespace API.Extentions
{
    public static class ApplicationServicesExtention
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddScoped<ITokenService,TokenService>();
            services.AddScoped<IProductRepository,ProductRepository>();
            services.AddScoped<IBasketRepository,BasketRepository>();
            services.AddScoped(typeof(IGenericRepository<>), (typeof(GenericRepository<>)));
            services.AddAutoMapper(typeof(MappingProfiles));

            return services;
        }
    }
}