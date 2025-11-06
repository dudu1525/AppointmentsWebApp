using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class Doctor
    {

        public int DoctorId { get; set; }
        public int UserId { get; set; }

        public int? ClinicId { get; set; }
        public String Type { get; set; } = string.Empty;
    

    //reffeences
        
        public Clinic? Clinic { get; set; }
         public User User { get; set; }
        public List<Appointment> Appointments { get; set; } = new List<Appointment>();

    }
    


}







//id doctor_name doctor_password doctor_clinic_id  type ((urolog, cardio, etc))