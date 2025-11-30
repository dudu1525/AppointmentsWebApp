using api.Dtos.Patient;
using api.Models;

namespace api.Interfaces
{
    public interface IPatientRepo
    {
        Task<List<Patient>> GetAllAsync();
        Task<Patient?> GetByIdAsync(int id);
        Task<Patient> CreateAsync(CreatePatientDto patientDto);
        Task<Patient?> UpdateAsync(int id, UpdatePatientDto patientDto);
        Task<Patient?> DeleteAsync(int id);
        
        Task<Patient?> GetByUserIdAsync(int userId);

        

    }
}