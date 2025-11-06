using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class Patient
    {

        public int PatientId { get; set; }
        public int UserId { get; set; }

        //refferences
        public List<Appointment> Appointments { get; set; } = new List<Appointment>();
        public User User { get; set; }

    }
    


}







//id user_name user_email user_password