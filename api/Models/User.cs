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

        public List<Appointment> Appointments { get; set; } = new List<Appointment>();

    }
    


}







//id user_name user_email user_password