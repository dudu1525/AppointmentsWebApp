using api.Dtos.User;
using api.Models;

namespace api.Mappers
{
    public static class UserMappers
    {
        public static Userdto ToUserDto(this User userModel)
        {
            return new Userdto
            {   UserId = userModel.Id,
                UserName = userModel.UserName,
                Email = userModel.Email,
                Role = userModel.Role
            };
        }

        public static User ToUserFromAdminRegister(this RegisterAdminDto adminDto)
        {
            return new User
            {   Name = adminDto.Name,     
                UserName = adminDto.UserName,
                Password = adminDto.Password,
                Role = "Admin",
                Email = adminDto.Email

            };

        }
    }
}