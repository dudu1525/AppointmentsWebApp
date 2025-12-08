using System.ComponentModel.DataAnnotations;

namespace api.Dtos.User
{
//sending data from server to clients/ after a log in for example
    public class RegisterAdminDto   
    {  
            [Required (AllowEmptyStrings = false, ErrorMessage = "Name is required")]
         [MinLength(5, ErrorMessage = "username must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="userName must be at most 20 characters long!")]
        public required  string Name { get; set; }
        [Required (AllowEmptyStrings = false, ErrorMessage = "Name is required")]
         [MinLength(5, ErrorMessage = "name must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="Name must be at most 20 characters long!")]
         public required  string UserName { get; set; }
        [Required (AllowEmptyStrings = false, ErrorMessage = "Name is required")]
          [MinLength(5, ErrorMessage = "emai must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="email must be at most 20 characters long!")]
        public required  string Email { get; set; }
        [Required (AllowEmptyStrings = false, ErrorMessage = "Name is required")]
         [MinLength(5, ErrorMessage = "password must be at least 5 characters long!")]
        [MaxLength(20, ErrorMessage ="password must be at most 20 characters long!")]
        
        public required  string Password { get; set; }

    }
    


}