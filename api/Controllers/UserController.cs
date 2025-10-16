using api.Data;
using api.Dtos.User;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
namespace api.Controllers
{

    [Route("api/users")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo _userrepo; 
        public UserController(IUserRepo iuserrepo)
        {
            
            _userrepo = iuserrepo;

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {

            var users = await _userrepo.GetAllAsync();
            var usersdto=users.Select(s => s.ToUserDto());

            return Ok(users);
        }

        [HttpGet("{id}")]

        public async  Task<IActionResult> GetById([FromRoute] int id)
        {
            var users = await _userrepo.GetByIdAsync(id);
            if (users == null)
                return NotFound();
         return Ok(users.ToUserDto());
        }


        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RegisterUserdto registerDto)
        {
            var userModel = registerDto.ToUserFromRegisterDto();
            await _userrepo.CreateAsync(userModel);
            return CreatedAtAction(nameof(GetById), new { id = userModel.Id }, userModel.ToUserDto());
        }


        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateById([FromRoute] int id, [FromBody] UpdateUserRequestDto updateUserDto)
        {
            var userModel = await _userrepo.UpdateUserAsync(id, updateUserDto);
            if (userModel == null)
            {
                return NotFound();
            }
            
            return Ok(userModel.ToUserDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var userModel = await _userrepo.DeleteAsync(id);
            if (userModel == null)
                return NotFound();
            return NoContent();
        

        }




    }



}