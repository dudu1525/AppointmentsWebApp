using System.Security.Principal;
using api.Data;
using api.Dtos.Doctor;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class DoctorRepo : IDoctorRepo
    {
         private readonly ApplicationDBContext _dbcontext;

        public DoctorRepo(ApplicationDBContext dBContext)
        {
            _dbcontext = dBContext;
        }
        public async Task<List<Doctor>> GetAllAsync()
        {
            return await  _dbcontext.Doctor.ToListAsync();
        }

        public async Task<Doctor?> GetByIdAsync(int id)
        {
            return await _dbcontext.Doctor.FindAsync(id);
        }
        
        public async Task<Doctor> CreateAsync(Doctor doctorModel)
        {
            await _dbcontext.Doctor.AddAsync(doctorModel);
            await _dbcontext.SaveChangesAsync();
            return doctorModel;
        }


    }


}
