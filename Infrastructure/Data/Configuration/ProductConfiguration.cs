using System.Security.Cryptography.X509Certificates;
using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Configuration
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(x=>x.Name).IsRequired().HasMaxLength(55);
            builder.Property(x=>x.Description).IsRequired().HasMaxLength(240);
            builder.Property(x=>x.PictureUrl).IsRequired();

            builder.HasOne(x=>x.ProductBrand).WithMany();
            builder.HasOne(x=>x.ProductType).WithMany();
        }
    }
}