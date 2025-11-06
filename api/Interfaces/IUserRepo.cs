using api.Models;

namespace api.Interfaces
{
    public interface IUserRepo
    {
     
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User> CreateAsync(User userModel);
        Task<User?> DeleteAsync(int id);

     
      //  Task<bool> UserExistsAsync(string email);
       // Task<User?> GetByEmailAsync(string email);
    }
}