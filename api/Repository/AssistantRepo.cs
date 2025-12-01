using System.Security.Principal;
using api.Data;
using api.Dtos.Assistant;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AssistantRepo : IAssistantRepo
    {
        private readonly ApplicationDBContext _dbcontext;
        private readonly IUserRepo _userRepo;

       public AssistantRepo(ApplicationDBContext dbcon, IUserRepo userrepo){
            _dbcontext = dbcon;
            _userRepo = userrepo;
        
        }
        public async Task<Assistant> CreateAsync(CreateAssistantDto createAssistantDto, int clinicId)
        {
             var newUser = new User
            {   Name = createAssistantDto.AssistantName,    
                UserName = createAssistantDto.AssistantUserName,
                Email = createAssistantDto.AssistantEmail,
                Password = createAssistantDto.Password, 
                Role = "Assistant"
            };


            var createdUser = await _userRepo.CreateAsync(newUser); //call to user repo for creating the user

            var assistantModel = new Assistant
            {
                UserId = createdUser.Id,
                ClinicId = clinicId,
            };

            await _dbcontext.Assistant.AddAsync(assistantModel);
            await _dbcontext.SaveChangesAsync();

            assistantModel.User = createdUser;
            return assistantModel;
        }

        public async Task<Assistant?> DeleteAssistantAsync(int id)
        {
          var assistantModel = await _dbcontext.Assistant.FirstOrDefaultAsync(X => X.AssistantId == id);
            if (assistantModel == null)
                return null;

            var userModel = await _userRepo.GetByIdAsync(assistantModel.UserId);

            _dbcontext.Assistant.Remove(assistantModel);

            if (userModel != null)
            {
                _dbcontext.User.Remove(userModel);
            }


            await _dbcontext.SaveChangesAsync();
            return assistantModel;
        }

        public async Task<List<Assistant>> GetAllAsync()
        {
             return await _dbcontext.Assistant.Include(d => d.User) .ToListAsync();
        }

        public async Task<Assistant?> GetByIdAsync(int id)
        {
             return await _dbcontext.Assistant.Include(d => d.User).FirstOrDefaultAsync(d => d.AssistantId == id);
        }

        public async Task<Assistant?> GetByUserIdAsync(int id)
        {
            return await _dbcontext.Assistant.Include(p => p.User)
        .FirstOrDefaultAsync(p => p.UserId == id); 
        }

        public async Task<Assistant?> UpdateAsync(int id, UpdateAssistantDto assistantDto)
        {
            var existingAssistant = await _dbcontext.Assistant.Include(p => p.User).FirstOrDefaultAsync(p => p.AssistantId == id);

            if (existingAssistant == null)
            {
                return null; 
            }


            existingAssistant.User.UserName = assistantDto.AssistantName;
            existingAssistant.User.Email = assistantDto.AssistantEmail;
                //need to check if id exists in clinics
            existingAssistant.ClinicId = assistantDto.ClinicId;
      

            await _dbcontext.SaveChangesAsync();

            return existingAssistant;
        }
    }


}

