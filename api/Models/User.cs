using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class User
    {

        public int Id { get; set; }
        public String UserName { get; set; } = string.Empty;

        public String Password { get; set; } = string.Empty;
        public String Email { get; set; } = string.Empty;

        public String Role { get; set; } = string.Empty;


        //refferences
        public Doctor Doctor { get; set; }
        public Patient Patient  { get; set; }
        public Assistant Assistant { get; set; }
        
       //admin has super abbilities, but no new fields

    }
    


}







//id user_name user_email user_password