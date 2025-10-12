using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
namespace api.Dtos.User
{
//sending data from server to clients
    public class Userdto
    {

        public int Id { get; set; }
        public String UserName { get; set; } = string.Empty;

        public String Email { get; set; } = string.Empty;

    }
    


}







//id user_name user_email user_password