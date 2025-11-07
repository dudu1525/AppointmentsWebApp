using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class Assistant
    {

        public int AssistantId { get; set; }
        
        public int UserId { get; set; }

        public int? ClinicId { get; set; }
        
        //reffeences
         public Clinic? Clinic { get; set; }
         public User User { get; set; }

    }
    


}




