using System.ComponentModel.DataAnnotations;

public class UpdateDoctorDto
{   [Required]
    [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
    [MaxLength(20, ErrorMessage = "Name must be at most 20 characters long!")]
    public string UserName { get; set; }

    [Required]
    [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
    [MaxLength(20, ErrorMessage = "Name must be at most 20 characters long!")]
    public string Name { get; set; }

    [Required]
    [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
    [MaxLength(20, ErrorMessage = "Name must be at most 20 characters long!")]
    public string Email { get; set; }

    public string Type { get; set; }

    
    public int ClinicId;

    
    

 
}