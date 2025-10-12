using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [Route("api/users")]            
    [ApiController]
   public class UserController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public UserController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            var users = _context.User.ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]

        public IActionResult GetById([FromRoute]int id)
        {
            var users = _context.User.Find(id);
            if (users == null)
            {
                return NotFound();
            }
            else
                return Ok(users);
        }






    }



}