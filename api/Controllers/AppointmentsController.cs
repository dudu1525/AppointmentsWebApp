using System.Security.Claims;
using api.Data;
using api.Dtos.Appointments;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{

    [Route("api/appointments")]            
    [ApiController]
   public class AppointmentsController : ControllerBase
    {

         private readonly IAppointmentRepo _appointmentRepo;
        private readonly IPatientRepo _patientRepo; 

        public AppointmentsController(IAppointmentRepo appointmentRepo, IPatientRepo patientRepo)
        {
            _appointmentRepo = appointmentRepo;
            _patientRepo = patientRepo;
        }

        [HttpPost]
        [Authorize(Roles = "Patient")] //patients can create appointments
        public async Task<IActionResult> Create([FromBody] CreateAppointmentDto appointmentDto)
        {   
                //get user id of the login
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userIdClaim == null) return Unauthorized();
            var userId = int.Parse(userIdClaim); //parse from string to int

            //find patient based on user id
            var patient = await _patientRepo.GetByUserIdAsync(userId);
            if (patient == null) return Forbid("User is not a valid patient.");

            //create appointmentModel based on the given info in the front end and the gotten patient id
            var appointmentModel = await _appointmentRepo.CreateAsync(appointmentDto, patient.PatientId);
            return CreatedAtAction(nameof(GetById), new { id = appointmentModel.Id }, appointmentModel);
        }


        [HttpGet("doctor/{doctorId}/day")]
        public async Task<IActionResult> GetAppointmentsFromADay([FromQuery] DateTime selectedDate, [FromRoute] int doctorId)
        {
            var appointments = await _appointmentRepo.GetAppointmentsFromADay(selectedDate, doctorId);
            return Ok(appointments);
        }

        [HttpGet("patient/{patientId}")]
        public async Task<IActionResult> GetAppointmentsForPatient( [FromRoute] int patientId)
        {
            var appointments = await _appointmentRepo.GetAppointmentsForPatient(patientId);
            return Ok(appointments);
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            var appointment = await _appointmentRepo.GetByIdAsync(id);
            if (appointment == null) return NotFound();

            // Add logic here to ensure the user is allowed to see this appointment
            
            return Ok(appointment.ToAppointmentDetailsDto());
        }


        [HttpGet("clinic/status/{clinicId:int}")]
        public async Task<IActionResult> GetAppointmentsForClinic([FromRoute] int clinicId,[FromQuery] string status)
            {   
        var appointments = await _appointmentRepo.GetAppointmentsByClinicAndStatusAsync(clinicId, status);

              if (appointments == null || !appointments.Any())
                return NotFound();

                var dtoList = appointments.Select(a => a.ToFullAppointment()).ToList();

                        return Ok(dtoList);
            }
        
        
        [HttpPut("updateStatus/{appointmentId:int}")]
        public async Task<IActionResult> UpdateAppointmentStatus([FromRoute] int appointmentId, [FromBody] string status)
        {
            var appointment = await _appointmentRepo.UpdateAppointmentStatus(appointmentId, status);

            if (appointment== null)
            return NotFound();

            var appointmentFull = appointment.ToFullAppointment();
            return Ok (appointmentFull);
        }

        [HttpPut("updateMessage/{appointmentId:int}")]
        public async Task<IActionResult> UpdateAppointmentMessage([FromRoute] int appointmentId, [FromBody] string message)
        {
            var appointment = await _appointmentRepo.UpdateAppointmentMessage(appointmentId, message);

            if (appointment== null)
            return NotFound();

            var appointmentFull = appointment.ToFullAppointment();
            return Ok (appointmentFull);
        }


        [HttpGet("doctorget/{doctorId:int}")]
        public async Task<IActionResult> GetAppointmentsByDoctorId([FromRoute] int doctorId)
        {
            var appointments = await _appointmentRepo.GetByDoctorIdAsync(doctorId);

            if (appointments==null)
            {
                return NotFound();
            }

           var dtoList = appointments.Select(a => a.ToFullAppointment()).ToList();

                        return Ok(dtoList);

        }


    }



}