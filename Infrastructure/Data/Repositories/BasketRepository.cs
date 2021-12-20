using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data.Repositories
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IConnectionMultiplexer _redis;
        private readonly  IDatabase db;
        public BasketRepository(IConnectionMultiplexer redis)
        {
            _redis = redis;
            db = redis.GetDatabase();
        }

        public async Task<bool> DeleteBasketAsync(string id)
        {
            return await db.KeyDeleteAsync(id);
        }

        public async Task<CustomerBasket> GetBasketAsync(string id)
        {
            var basket = await db.StringGetAsync(id);

            return basket.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(basket);
        }

        public async Task<string> GetFoo()
        {
            //var db = _redis.GetDatabase();
            var foo = await db.StringGetAsync("mykey");
            
            return foo.ToString();
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket item)
        {
            var created = await db.StringSetAsync(item.Id,JsonSerializer.Serialize<CustomerBasket>(item),TimeSpan.FromDays(30));


            if(!created) return null;


            return await GetBasketAsync(item.Id);

        }
    }
}