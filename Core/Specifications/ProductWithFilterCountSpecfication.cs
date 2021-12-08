using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithFilterCountSpecfication : BaseSpecification<Product>
    {
        public ProductWithFilterCountSpecfication(ProductParams productParams)
         : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || (x.Name.Contains(productParams.Search))) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
                (!productParams.BrandId.HasValue ||  x.ProductBrandId == productParams.BrandId)
                
            )
        {
        }
    }
}