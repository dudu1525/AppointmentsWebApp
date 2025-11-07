namespace api.Dtos.User
{
//sending data from server to clients/ after a log in for example
    public class RegisterAdminDto
    {

         public string UserName { get; set; }
        public string Email { get; set; }
        
        public string Password { get; set; }

    }
    


}