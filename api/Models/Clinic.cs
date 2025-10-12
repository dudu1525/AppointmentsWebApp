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
        public int locationx { get; set; }
        public int locationy { get; set; }

        public List<Doctor> Doctors { get; set; } = new List<Doctor>();

    }
    


}













//id_clinic name location.x location.y