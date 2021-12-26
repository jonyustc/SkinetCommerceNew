using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly IBasketRepository _basketRepo;
        public BasketController(IBasketRepository basketRepo)
        {
            _basketRepo = basketRepo;
        }

        [HttpGet]
        public async Task<ActionResult<CustomerBasket>> GetBasket(string id)
        {
            var data  = await _basketRepo.GetBasketAsync(id);
            return Ok(data ?? new CustomerBasket(id));
        }

        [HttpGet("foo")]
        public async Task<IActionResult> GetFoo()
        {
            var data = await _basketRepo.GetFoo();
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<CustomerBasket>> UpdateBasket([FromBody]CustomerBasket basket)
        {
            var data = await _basketRepo.UpdateBasketAsync(basket);

            return Ok(data);
        }

        [HttpDelete]
        public async Task DeleteBasket(string id)
        {
            await _basketRepo.DeleteBasketAsync(id);
        }
    }
}