using System.ComponentModel.DataAnnotations;

public class UpdatePatientDto
{   [Required]
  [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="Name must be at most 20 characters long!")]
    public string UserName { get; set; }
 
}