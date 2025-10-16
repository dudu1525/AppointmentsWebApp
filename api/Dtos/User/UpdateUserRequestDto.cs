using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using System.ComponentModel.DataAnnotations;
namespace api.Dtos.User
{
//receiving user data when registering 
    public class UpdateUserRequestDto
    {

        public String UserName { get; set; } = string.Empty;
        public String Password { get; set; } = string.Empty;
        public String Email { get; set; }  = string.Empty;

    }
    


}
