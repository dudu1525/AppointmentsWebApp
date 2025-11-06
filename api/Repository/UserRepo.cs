using api.Data;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class UserRepo : IUserRepo
    {
        private readonly ApplicationDBContext _dbcontext;

        public UserRepo(ApplicationDBContext dBContext)
        {
            _dbcontext = dBContext;
        }


        public async Task<User> CreateAsync(User userModel)
        {
           
            // userModel.Password = BCrypt.Net.BCrypt.HashPassword(userModel.Password);
            await _dbcontext.User.AddAsync(userModel);
            await _dbcontext.SaveChangesAsync();
            return userModel;
        }

        public async Task<User?> DeleteAsync(int id)
        {
            var userModel = await _dbcontext.User.FirstOrDefaultAsync(x => x.Id == id);
            if (userModel == null) return null;
            _dbcontext.User.Remove(userModel);
            await _dbcontext.SaveChangesAsync();
            return userModel;
        }

        public async Task<User?> GetByIdAsync(int id)
        {
            return await _dbcontext.User.FindAsync(id);
        }

        public async Task<List<User>> GetAllAsync()
        {
            
            return await _dbcontext.User.ToListAsync();
        }

       
       // public async Task<User?> GetByEmailAsync(string email)
       // {
       //     return await _dbcontext.User.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
      //  }


      //  public async Task<bool> UserExistsAsync(string email)
      //  {
       //     return await _dbcontext.User.AnyAsync(u => u.Email.ToLower() == email.ToLower());
      //  }
    }
}