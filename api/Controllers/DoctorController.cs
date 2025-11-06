using api.Data;
using api.Dtos.Doctor;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
namespace api.Controllers
{

    [Route("api/doctors")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctorRepo doctorrepo;
        private readonly IClinicRepo clinicrepo;
        public DoctorController(IDoctorRepo ddoctorrepo, IClinicRepo cclinicrepo)
        {

            doctorrepo = ddoctorrepo;
            clinicrepo = cclinicrepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var doctors = await doctorrepo.GetAllAsync();
            var doctordto = doctors.Select(d => d.ToDoctorDetailsDto());

            return Ok(doctordto);
        }

        [HttpGet("{id:int}")]

        public async  Task<IActionResult> GetById([FromRoute] int id)
        {
            var doctor = await doctorrepo.GetByIdAsync(id);
            if (doctor == null)
                return NotFound();
         return Ok(doctor.ToDoctorDetailsDto());
        }

        [HttpPost("{clinicId:int}")]
       public async Task<IActionResult> CreateDoctor([FromRoute] int clinicId, [FromBody] CreateDoctorDto registerDto)
        {
            
            if (!await clinicrepo.ClinicExists(clinicId))
            {
                return BadRequest("Clinic does not exist!");
            }

           
            var doctorModel = await doctorrepo.CreateAsync(registerDto, clinicId);

           
            return CreatedAtAction(
                nameof(GetById), 
                new { id = doctorModel.DoctorId }, 
                doctorModel.ToDoctorDetailsDto()
            );
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteDoctor([FromRoute] int id)
        {
            var doctorModel = await doctorrepo.DeleteDoctorAsync(id);
            if (doctorModel == null)
                return NotFound("Doctor does not exist!");
            return NoContent();
        }
        

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateDoctorDto updateDto)
        {
         
            var doctorModel = await doctorrepo.UpdateAsync(id, updateDto);

            if (doctorModel == null)
            {
                return NotFound();
            }
            
            return Ok(doctorModel.ToDoctorDetailsDto());
        }


    }
}