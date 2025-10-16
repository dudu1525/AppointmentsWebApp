



using api.Dtos.User;
using api.Models;

namespace api.Interfaces
{

    public interface IUserRepo
    {
        Task<List<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);

        Task<User> CreateAsync(User userModel);

        Task<User?> UpdateUserAsync(int id, UpdateUserRequestDto userDto);

        Task<User?> DeleteAsync(int id);



    }


}