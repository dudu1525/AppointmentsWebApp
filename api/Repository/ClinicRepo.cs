using System.Security.Principal;
using api.Data;
//using api.Dtos.Clinic;
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
    }


}