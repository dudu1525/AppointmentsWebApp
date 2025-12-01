using api.Data;
using api.Dtos.Assistant;
using api.Interfaces;
using api.Mappers;
using api.Models;
using api.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
namespace api.Controllers
{

    [Route("api/assistants")]
    [ApiController]
    public class AssistantController : ControllerBase
    {
             private readonly IAssistantRepo assistantRepo;
        private readonly IClinicRepo clinicrepo;

        public AssistantController(IAssistantRepo assirepo, IClinicRepo clinicrepo)
        {
            assistantRepo = assirepo;
            this.clinicrepo = clinicrepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var assistants = await assistantRepo.GetAllAsync();
            var assistantdto = assistants.Select(d => d.ToAssistantDetailsDto());

            return Ok(assistantdto);
        }

        [HttpGet("{id:int}")]

        public async  Task<IActionResult> GetById([FromRoute] int id)
        {
            var assistant = await assistantRepo.GetByIdAsync(id);
            if (assistant == null)
                return NotFound();
         return Ok(assistant.ToAssistantDetailsDto());
        }

        [HttpPost("{clinicId:int}")]
       public async Task<IActionResult> CreateAssistant([FromRoute] int clinicId, [FromBody] CreateAssistantDto registerDto)
        {
            
            if (!await clinicrepo.ClinicExists(clinicId))
            {
                return BadRequest("Clinic does not exist!");
            }

           
            var assistantModel = await assistantRepo.CreateAsync(registerDto, clinicId);

           
            return CreatedAtAction(
                nameof(GetById), 
                new { id = assistantModel.AssistantId }, 
                assistantModel.ToAssistantDetailsDto()
            );
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteDoctor([FromRoute] int id)
        {
            var doctorModel = await assistantRepo.DeleteAssistantAsync(id);
            if (doctorModel == null)
                return NotFound("Assistant does not exist!");
            return NoContent();
        }
        

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateAssistantDto updateDto)
        {       if (!await clinicrepo.ClinicExists(updateDto.ClinicId))
            {
                return BadRequest("Clinic does not exist!");
            }

            var assistantModel = await assistantRepo.UpdateAsync(id, updateDto);

            if (assistantModel == null)
            {
                return NotFound();
            }
            
            return Ok(assistantModel.ToAssistantDetailsDto());
        }

     [HttpGet("usr/{id:int}")]
        public async Task<IActionResult> GetByUserId([FromRoute] int id)
        {
            
            var assistant = await assistantRepo.GetByUserIdAsync(id);

            if (assistant == null)
            {
                return NotFound();
            }

            return Ok(assistant.ToAssistantDetailsDto());
        }













    }



}
