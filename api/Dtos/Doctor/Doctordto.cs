using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
namespace api.Dtos.Doctor
{
//sending data from server to clients
    public class Doctordto
    {
        
         public int Id { get; set; }
        
        public String DoctorName { get; set; } = string.Empty;

        public int? ClinicId { get; set; }
       
        public String Type { get; set; } = string.Empty;


    }
    


}
