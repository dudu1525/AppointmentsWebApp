using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
namespace api.Dtos.User
{
//sending data from server to clients/ after a log in for example
    public class Userdto
    {
        public int UserId {get;set;}
         public string UserName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }

    }
    


}







//id user_name user_email user_password