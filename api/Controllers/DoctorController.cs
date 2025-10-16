using api.Data;
using api.Dtos.Doctor;
using api.Interfaces;
using api.Mappers;
using api.Models;
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
            var doctordto = doctors.Select(d => d.ToDoctorDto());

            return Ok(doctors);
        }

        [HttpGet("{id}")]

        public async  Task<IActionResult> GetById([FromRoute] int id)
        {
            var doctor = await doctorrepo.GetByIdAsync(id);
            if (doctor == null)
                return NotFound();
         return Ok(doctor.ToDoctorDto());
        }

        [HttpPost("{clinicId}")]
        public async Task<IActionResult> CreateDoctor([FromRoute] int clinicId, DoctorRegisterDto registerDto)
        {

            if (!await clinicrepo.ClinicExists(clinicId))
                return BadRequest("Clinic does not exist!");

            var doctorModel = registerDto.ToDoctorFromRegister(clinicId);//go from inputed to full model
            await doctorrepo.CreateAsync(doctorModel);
            return CreatedAtAction(nameof(GetById), new { id = doctorModel }, doctorModel.ToDoctorDto());//only shows needed information


        }
        
        


    }
}