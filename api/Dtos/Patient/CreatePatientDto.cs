using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Patient
{
    public class CreatePatientDto
    {
        [Required]
        [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="Name must be at most 20 characters long!")]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }


    }
}