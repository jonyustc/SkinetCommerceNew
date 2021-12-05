using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification()
        {
            IncludeAdd(x=>x.ProductType);
            IncludeAdd(x=>x.ProductBrand);
        }

        public ProductsWithTypesAndBrandsSpecification(int id)
            :base(x=>x.Id == id)
        {
            IncludeAdd(x=>x.ProductType);
            IncludeAdd(x=>x.ProductBrand);
        }
       
    }
}