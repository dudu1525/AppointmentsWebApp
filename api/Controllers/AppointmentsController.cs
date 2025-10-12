using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [Route("api/appointments")]            
    [ApiController]
   public class AppointmentsController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        public AppointmentsController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            var stocks = _context.Appointment.ToList();
            return Ok(stocks);
        }

        [HttpGet("{id}")]

        public IActionResult GetById([FromRoute]int id)
        {
            var stock = _context.Appointment.Find(id);
            if (stock == null)
            {
                return NotFound();
            }
            else
                return Ok(stock);
        }






    }



}