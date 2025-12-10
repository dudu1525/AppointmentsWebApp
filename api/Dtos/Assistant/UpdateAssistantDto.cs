using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Assistant
{
    // For sending doctor data safely to the client
    public class UpdateAssistantDto
    {
         [Required]
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
        
        public int ClinicId { get; set; }
   
    }
}