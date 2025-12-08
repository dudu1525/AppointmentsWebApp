
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{

    public class Symptoms
    {

        public int Id { get; set; }
        public int? PatientId { get; set; }

        public DateTime DateSubmitted { get; set; } = DateTime.Now;

        public Boolean? SoreThroat  { get; set; }

        public Boolean? Cough  { get; set; }

        public Boolean? AbdominalPain  { get; set; }

        public Boolean? Fever  { get; set; }

        public Boolean? Headache  { get; set; }

        public string? CritialSymptoms  { get; set; }

        public string? OtherSymptoms  { get; set; }


        //refferences
        
        public Patient? Patient { get; set; }
    }
    


}


