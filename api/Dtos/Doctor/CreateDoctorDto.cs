using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
namespace api.Dtos.Doctor
{
//sending data from server to clients
    public class CreateDoctorDto
    {     
          [Required]
        [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="Name must be at most 20 characters long!")]
          public string DoctorUserName{get;set;}
          [Required]
        [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="Name must be at most 20 characters long!")]
            public string DoctorName { get; set; }
          public string DoctorEmail { get; set; }
          [Required]
        [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="Name must be at most 20 characters long!")]
             public string Password { get; set; }
            public string Type { get; set; }


    }
    


}
