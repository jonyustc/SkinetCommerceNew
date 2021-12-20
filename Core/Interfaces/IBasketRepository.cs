using Core.Entities;

namespace Core.Interfaces
{
    public interface IBasketRepository
    {
        Task<CustomerBasket> GetBasketAsync(string id);
        Task<CustomerBasket> UpdateBasketAsync(CustomerBasket item);
        Task<bool> DeleteBasketAsync(string id);
        Task<string>  GetFoo();
    }
}