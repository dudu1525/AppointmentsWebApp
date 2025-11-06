using System.Security.Principal;
using api.Data;
using api.Dtos.Doctor;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class DoctorRepo : IDoctorRepo
    {
        private readonly ApplicationDBContext _dbcontext;
        private readonly IUserRepo _userRepo;
        
        public DoctorRepo(ApplicationDBContext dBContext, IUserRepo userRepo)
        {
            _dbcontext = dBContext;
            _userRepo = userRepo;
        }
        public async Task<List<Doctor>> GetAllAsync()
        {
             return await _dbcontext.Doctor
            .Include(d => d.User) 
            .ToListAsync();
        }

        public async Task<Doctor?> GetByIdAsync(int id)
        {
            return await _dbcontext.Doctor
        .Include(d => d.User)
        .FirstOrDefaultAsync(d => d.DoctorId == id);
        }
        
         public async Task<Doctor> CreateAsync(CreateDoctorDto doctorDto, int clinicId)
        {
           
            var newUser = new User
            {
                UserName = doctorDto.DoctorName,
                Email = doctorDto.DoctorEmail,
                Password = doctorDto.Password, 
                Role = "Doctor"
            };


            var createdUser = await _userRepo.CreateAsync(newUser);

            var doctorModel = new Doctor
            {
                UserId = createdUser.Id,
                ClinicId = clinicId,
                Type = doctorDto.Type
            };

            await _dbcontext.Doctor.AddAsync(doctorModel);
            await _dbcontext.SaveChangesAsync();

            doctorModel.User = createdUser;
            return doctorModel;
        }

        public async Task<Doctor?> DeleteDoctorAsync(int id)
        {
            var doctorModel = await _dbcontext.Doctor.FirstOrDefaultAsync(X => X.DoctorId == id);
            if (doctorModel == null)
                return null;

            var userModel = await _userRepo.GetByIdAsync(doctorModel.UserId);

            _dbcontext.Doctor.Remove(doctorModel);

            if (userModel != null)
            {
                _dbcontext.User.Remove(userModel);
            }


            await _dbcontext.SaveChangesAsync();
            return doctorModel;
        }
        

        public async Task<Doctor?> UpdateAsync(int id, UpdateDoctorDto doctorDto)
        {
            
            var existingDoctor = await _dbcontext.Doctor.Include(p => p.User).FirstOrDefaultAsync(p => p.DoctorId == id);

            if (existingDoctor == null)
            {
                return null; 
            }


            existingDoctor.User.UserName = doctorDto.DoctorName;
            existingDoctor.Type = doctorDto.Type;

            await _dbcontext.SaveChangesAsync();

            return existingDoctor;
        }
    }


}
