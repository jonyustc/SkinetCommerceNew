using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BasketItemDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public string ProductName { get; set; }

        [Required]
        [Range(.50,double.MaxValue,ErrorMessage = "Price Cannot be Zero")]
        public decimal Price { get; set; }

        [Required]
        [Range(1,double.MaxValue,ErrorMessage = "Quantity Cannot be Zero")]
        public decimal Quantity { get; set; }

        [Required]
        public string PictureUrl { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Brand { get; set; }
    }
}