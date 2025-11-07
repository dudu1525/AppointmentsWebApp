
using api.Data;
using api.Dtos.Clinic;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
namespace api.Controllers
{

    [Route("api/clinics")]
    [ApiController]
    public class ClinicController : ControllerBase
    {
         private readonly IClinicRepo clinicrepo;
        public ClinicController(IClinicRepo cclinicrepo)
        {
            clinicrepo = cclinicrepo;
        }
        



         [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateClinicDto clinicDto)
        {
            var clinicModel = await clinicrepo.CreateAsync(clinicDto);
            return CreatedAtAction(nameof(GetById), new { id = clinicModel.Id }, clinicModel); 
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var clinic = await clinicrepo.GetByIdAsync(id);
            if (clinic == null) return NotFound();

            return Ok(clinic.ToClinicDetailsDto());
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var clinics = await clinicrepo.GetAllAsync();
          //  var clinicsdto = clinics.Select(c => c.ToDoctorDetailsDto());

            return Ok(clinics);
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateClinicDto clinicDto)
        {
            var clinicModel = await clinicrepo.UpdateAsync(id, clinicDto);
            if (clinicModel == null) return NotFound();
            return Ok(clinicModel); 
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var clinicModel = await clinicrepo.DeleteAsync(id);
                if (clinicModel == null)
                {
                    return NotFound("Clinic not found.");
                }
                return NoContent();
            }
            catch (InvalidOperationException ex)
            {
                
                return BadRequest(ex.Message);
            }
        }



        
    }



}
