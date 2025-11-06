using api.Data;
using api.Dtos.Patient;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class PatientRepo : IPatientRepo
    {
        private readonly ApplicationDBContext _context;
        private readonly IUserRepo _userRepo;

        public PatientRepo(ApplicationDBContext context, IUserRepo userRepo)
        {
            _context = context;
            _userRepo = userRepo;
        }

        public async Task<Patient> CreateAsync(CreatePatientDto patientDto)
        {
           
            var newUser = patientDto.ToUserFromCreateDto();
            
            var createdUser = await _userRepo.CreateAsync(newUser);
    
            var patientModel = new Patient
            {
                UserId = createdUser.Id
            };


            await _context.Patient.AddAsync(patientModel);
            await _context.SaveChangesAsync();
            

            patientModel.User = createdUser;
            return patientModel;
        }

        public async Task<Patient?> UpdateAsync(int id, UpdatePatientDto patientDto)
        {
            
            var existingPatient = await _context.Patient.Include(p => p.User).FirstOrDefaultAsync(p => p.PatientId == id);

            if (existingPatient == null)
            {
                return null; 
            }

            
            existingPatient.User.UserName = patientDto.UserName;

            await _context.SaveChangesAsync();

            return existingPatient;
        }

 
        public async Task<Patient?> DeleteAsync(int id)
        {
            var patientModel = await _context.Patient.FirstOrDefaultAsync(p => p.PatientId == id);

            if (patientModel == null)
            {
                return null; 
            }

            var userModel = await _userRepo.GetByIdAsync(patientModel.UserId);


            _context.Patient.Remove(patientModel);
            

            if(userModel != null)
            {
                _context.User.Remove(userModel);
            }

            await _context.SaveChangesAsync();
            
            return patientModel;
        }

        public async Task<List<Patient>> GetAllAsync()
        {
        
            return await _context.Patient.Include(p => p.User).ToListAsync();
        }


        public async Task<Patient?> GetByIdAsync(int id)
        {
            return await _context.Patient.Include(p => p.User).FirstOrDefaultAsync(p => p.PatientId == id);
        }

        
    }
}