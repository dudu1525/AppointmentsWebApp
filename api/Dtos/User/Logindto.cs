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

        [Required]
        [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="Name must be at most 20 characters long!")]
        public String UserName { get; set; } = string.Empty;

        public String Password { get; set; } = string.Empty;

    }
    


}



