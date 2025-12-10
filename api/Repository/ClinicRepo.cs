using System.Security.Principal;
using api.Data;
using api.Dtos.Clinic;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class ClinicRepo : IClinicRepo
    {
         private readonly ApplicationDBContext _dbcontext;

        public ClinicRepo(ApplicationDBContext dBContext)
        {
            _dbcontext = dBContext;
        }

        public Task<bool> ClinicExists(int id)
        {
            return _dbcontext.Clinic.AnyAsync(c => c.Id == id);
        }


         public async Task<Clinic> CreateAsync(CreateClinicDto clinicDto)
        {
            var clinicModel = new Clinic
            {
                Name = clinicDto.Name,
                location = clinicDto.Location
            };
            await _dbcontext.Clinic.AddAsync(clinicModel);
            await _dbcontext.SaveChangesAsync();
            return clinicModel;
        }

        public async Task<Clinic?> DeleteAsync(int id)
        {
           
            var clinicModel = await _dbcontext.Clinic
                .Include(c => c.Doctors)
                .Include(c => c.Assistants)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (clinicModel == null)
            {
                return null; 
            }

           
            if (clinicModel.Doctors.Any() || clinicModel.Assistants.Any())
            {
                
                throw new InvalidOperationException("Cannot delete clinic with assigned staff.");
            }

            _dbcontext.Clinic.Remove(clinicModel);
            await _dbcontext.SaveChangesAsync();
            return clinicModel;
        }

        public async Task<List<Clinic>> GetAllAsync()
        {
            
             return await _dbcontext.Clinic
        .Include(c => c.Doctors)
            .ThenInclude(d => d.User)  
        .Include(c => c.Assistants)
            .ThenInclude(a => a.User)  
        .ToListAsync();
        }

        public async Task<Clinic?> GetByIdAsync(int id)
        {
            
            return await _dbcontext.Clinic
                .Include(c => c.Doctors).ThenInclude(d => d.User)
                .Include(c => c.Assistants).ThenInclude(a => a.User)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Clinic?> UpdateAsync(int id, UpdateClinicDto clinicDto)
        {
            var existingClinic = await _dbcontext.Clinic.FindAsync(id);
            if (existingClinic == null)
            {
                return null;
            }
            existingClinic.Name = clinicDto.Name;
            existingClinic.location = clinicDto.Location;
            await _dbcontext.SaveChangesAsync();
            return existingClinic;
        }


        //function to assign doctor or assistnat?
        //in input I have the clinic id and the doctor id <this is done elsewhere

        //in input i have the clinic id and assistant id <done elsewhere



    }


}