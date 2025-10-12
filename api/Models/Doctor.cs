using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class Doctor
    {

        public int Id { get; set; }
        
        public String DoctorName { get; set; } = string.Empty;

        public String Password { get; set; } = string.Empty;

        public int? ClinicId { get; set; }
        public Clinic? Clinic { get; set; }

        public String Type { get; set; } = string.Empty;

        public List<Appointment> Appointments { get; set; } = new List<Appointment>();

    }
    


}







//id doctor_name doctor_password doctor_clinic_id  type ((urolog, cardio, etc))