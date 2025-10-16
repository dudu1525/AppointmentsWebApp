using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using System.ComponentModel.DataAnnotations;
namespace api.Dtos.User
{
//receiving user data when loging in
    public class Logindto
    {


        public String UserName { get; set; } = string.Empty;

        public String Password { get; set; } = string.Empty;

    }
    


}



