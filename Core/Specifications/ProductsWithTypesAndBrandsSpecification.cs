using System.Xml.Schema;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithTypesAndBrandsSpecification : BaseSpecification<Product>
    {
        public ProductsWithTypesAndBrandsSpecification(ProductParams productParams)
            : base(x => 
                (string.IsNullOrEmpty(productParams.Search) || (x.Name.Contains(productParams.Search))) &&
                (!productParams.TypeId.HasValue || x.ProductTypeId == productParams.TypeId) &&
                (!productParams.BrandId.HasValue ||  x.ProductBrandId == productParams.BrandId)
                
            )
                
        {
            IncludeAdd(x=>x.ProductType);
            IncludeAdd(x=>x.ProductBrand);
            AddOrderBy(x=>x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex -1),productParams.PageSize);

            if(!string.IsNullOrEmpty(productParams.Sort))
            {
            switch(productParams.Sort)
            {
                case "priceAsc" :
                AddOrderBy(x=>x.Price);
                break; 
                case "priceDesc" :
                AddOrderByDesc(x=>x.Price);
                break;
                default:
                AddOrderBy(x=>x.Name);
                break;
            }
            }
            
            

        }

        public ProductsWithTypesAndBrandsSpecification(int id)
            :base(x=>x.Id == id)
        {
            IncludeAdd(x=>x.ProductType);
            IncludeAdd(x=>x.ProductBrand);
        }
       
    }
}