using api.Dtos.Patient;
using api.Dtos.Doctor;
using api.Dtos.User;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;

namespace api.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //repositories for the specific roles
        private readonly IPatientRepo _patientRepo;
        private readonly IDoctorRepo _doctorRepo;
        private readonly IUserRepo _userRepo;


        public AuthController(IPatientRepo patientRepo, IUserRepo userRepo)
        {
            _patientRepo = patientRepo;
            _userRepo = userRepo;
           // _tokenService = tokenService;
        }


       [HttpPost("login")]
        public async Task<IActionResult> Login(Logindto loginDto) 
        {
     
            var allUsers = await _userRepo.GetAllAsync();
            var user = allUsers.FirstOrDefault(u => 
                u.UserName.Equals(loginDto.UserName, StringComparison.OrdinalIgnoreCase));

            if (user == null)
            {
                return Unauthorized("Invalid Username or Password.");
            }

            return Ok(new Userdto
            {
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role,
            });
        }


        [HttpPost("register-patient")]
        public async Task<IActionResult> RegisterPatient([FromBody] CreatePatientDto patientDto)
        {

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var patient = await _patientRepo.CreateAsync(patientDto);


            return Ok(new Userdto
            {
                UserName = patient.User.UserName,
                Email = patient.User.Email,
                Role = patient.User.Role,

            });
        }

        [HttpGet]
         public async Task<IActionResult> GetAll()
        {

            var allusers = await _userRepo.GetAllAsync();
            var usersDto = allusers.Select(u => u.ToUserDto());
            return Ok(usersDto);
        }
        



       
    }
}