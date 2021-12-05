using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class ProductImageUrlResolver : IValueResolver<Product, ProductToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public ProductImageUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Product source, ProductToReturnDto destination, string destMember, ResolutionContext context)
        {
            var apiUrl = _config["ApiUrl"];
            if(!string.IsNullOrEmpty(apiUrl))
            {
                return apiUrl + source.PictureUrl;
            }

            return null;
        }
    }
}