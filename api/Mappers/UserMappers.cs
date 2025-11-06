using api.Dtos.User;
using api.Models;

namespace api.Mappers
{
    public static class UserMappers
    {
        public static Userdto ToUserDto(this User userModel)
        {
            return new Userdto
            {
                UserName = userModel.UserName,
                Email = userModel.Email,
                Role = userModel.Role
            };
        }
    }
}