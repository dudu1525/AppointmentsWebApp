




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
                Id = userModel.Id,
                UserName = userModel.UserName,
                Email = userModel.Email
            };
        }

        public static User ToUserFromRegisterDto(this RegisterUserdto userDto)
        {
            return new User
            {

                UserName = userDto.UserName,
                Password = userDto.Password,
                Email = userDto.Email 

            };  


        }


    }



}