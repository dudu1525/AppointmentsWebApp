using api.Dtos.Patient;
using api.Dtos.Doctor;
using api.Dtos.User;
using api.Interfaces;
using Microsoft.AspNetCore.Mvc;
using api.Mappers;
using Microsoft.AspNetCore.Authorization;

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

         private readonly ITokenService _tokenService;
        public AuthController(IPatientRepo patientRepo, IUserRepo userRepo, ITokenService tokenService)
        {   _tokenService = tokenService;
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

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
             {
                 return Unauthorized("Invalid Username or Password.");
             }

             var token = _tokenService.CreateToken(user);

            return Ok(new  //ill add later a dto
            {   
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role,
                Token = token,
                 UserId = user.Id 
            });
        }


        [HttpPost("register-patient")]
        public async Task<IActionResult> RegisterPatient([FromBody] CreatePatientDto patientDto)
        {
             
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var allUsers = await _userRepo.GetAllAsync();
            var user = allUsers.FirstOrDefault(u => 
                u.UserName.Equals(patientDto.UserName, StringComparison.OrdinalIgnoreCase));

            if (user != null) //if user already exists!
            {
                return Unauthorized("Username already exists, choose another one!");
            }
            

            var patient = await _patientRepo.CreateAsync(patientDto);

            var token = _tokenService.CreateToken(patient.User);
            
            return Ok(new //send the id??
            {
                UserName = patient.User.UserName,
                Email = patient.User.Email,
                Role = patient.User.Role,
                Token = token ,
                UserId = patient.User.Id, 

                
            });
        }

        [HttpGet("get-all-users")]
        [Authorize(Roles = "Admin")] 
         public async Task<IActionResult> GetAll()
        {

            var allusers = await _userRepo.GetAllAsync();
            var usersDto = allusers.Select(u => u.ToUserDto());
            return Ok(usersDto);
        }


        [HttpPost("create-admin")]
        //need to be admin in order to create another admin
        [Authorize(Roles = "Admin")] 
        public async Task<IActionResult> CreateAdmin([FromBody] RegisterAdminDto adminDto)
        {
                //transform to normal user
            var userModel = adminDto.ToUserFromAdminRegister();

            var createdAdmin = await _userRepo.CreateAsync(userModel);
            var token = _tokenService.CreateToken(createdAdmin);
                //return dto, so no password is returned
                 return Ok(new //add dto here
                 {
                     UserName = createdAdmin.UserName,
                     Email = createdAdmin.Email,
                     Role = createdAdmin.Role,
                    Token = token,


                 });

        }

       
    }
}