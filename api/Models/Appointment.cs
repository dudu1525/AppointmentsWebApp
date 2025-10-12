
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class Appointment
    {

        public int Id { get; set; }
        public int? DoctorId { get; set; } 

        public int? UserId { get; set; }
         public Doctor? Doctor { get; set; }
        public User? User { get; set; }

        public DateTime CreatedOn { get; set; } = DateTime.Now;

        public String Status { get; set; } = string.Empty;
        public String Message { get; set; } = string.Empty;

    }
    


}







//id_app doctor_assigned_id client_assigned_id status    message (null or ..)