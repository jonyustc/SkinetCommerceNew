using System.Linq;
using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly StoreContext _context;
        public BuggyController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("notfound")]
        public IActionResult NotFoundError()
        {
            var product = _context.Products.FirstOrDefault(x=>x.Id == 42);

            if(product == null)
            {
                return NotFound(new ApiResponse(404));
            }

            return Ok(product);
        }


        [HttpGet("servererror")]
        public IActionResult ServerError()
        {

            var product = _context.Products.FirstOrDefault(x=>x.Id == 42);

            // if(product == null){
            //     return BadRequest();
            // }

            product.ToString();


            return Ok(product);
            
            
        }


        [HttpGet("validationerror/{id}")]
        public IActionResult ValidationError(int id)
        {
            var product = _context.Products.FirstOrDefault(x=>x.Id == 42);

            if(product == null)
            {
                return BadRequest(new ApiResponse(400));
            }

            return Ok(product);
        }

        [HttpGet("badrequest")]
        public IActionResult BadRequestError()
        {
            return BadRequest(new ApiResponse(400));
        }

        


    }
}