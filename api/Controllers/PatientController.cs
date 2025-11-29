using api.Interfaces;
using api.Mappers; // You'll need mappers for your new DTOs
using api.Dtos.Patient; // And new DTOs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/patients")]
    [ApiController]

    public class PatientsController : ControllerBase
    {
        private readonly IPatientRepo _patientRepo;

        public PatientsController(IPatientRepo patientRepo)
        {
            _patientRepo = patientRepo;
        }

        
        [HttpGet]
       // [Authorize(Roles = "Admin, Doctor")] 
        public async Task<IActionResult> GetAll()
        {
            var patients = await _patientRepo.GetAllAsync();
          
            var patientsDto = patients.Select(p => p.ToPatientDetailsDto());
            return Ok(patientsDto);
        }


        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            
            var patient = await _patientRepo.GetByUserIdAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            return Ok(patient.ToPatientDetailsDto());
        }


        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdatePatientDto updateDto)
        {
         
            var patientModel = await _patientRepo.UpdateAsync(id, updateDto);

            if (patientModel == null)
            {
                return NotFound();
            }
            
            return Ok(patientModel.ToPatientDetailsDto());
        }


        [HttpDelete("{id:int}")]
       // [Authorize(Roles = "Admin")] 
        public async Task<IActionResult> Delete([FromRoute] int id)
        {


            try
            {
            var patientModel = await _patientRepo.DeleteAsync(id);

            if (patientModel == null)
            {
                return NotFound();
            }

            return NoContent();      


            }catch (InvalidOperationException ex)
            {
            return BadRequest(ex.Message);

            }
           
        }
    }
}