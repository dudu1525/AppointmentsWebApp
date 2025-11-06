using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class Clinic
    {

        public int Id { get; set; }
        public String Name { get; set; } = string.Empty;
        public String location { get; set; } = string.Empty;


            //refferences
        public List<Doctor> Doctors { get; set; } = new List<Doctor>();

        public List<Assistant> Assistants { get; set; } = new List<Assistant>();

    }
    


}













//id_clinic name location.x location.y