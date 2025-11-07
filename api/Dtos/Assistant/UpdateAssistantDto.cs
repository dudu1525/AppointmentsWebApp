using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Assistant
{
    // For sending doctor data safely to the client
    public class UpdateAssistantDto
    {
           [Required]
        [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage = "Name must be at most 20 characters long!")]
        public string AssistantName { get; set; }
           [Required]
        [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage = "Name must be at most 20 characters long!")]
        public string AssistantEmail { get; set; }
        
        public int ClinicId { get; set; }
   
    }
}