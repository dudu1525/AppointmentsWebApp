
using api.Dtos.Doctor;
using api.Models;
using api.Dtos.Clinic;

namespace api.Interfaces
{

    public interface IClinicRepo
    {
        Task<List<Clinic>> GetAllAsync();
        Task<Clinic?> GetByIdAsync(int id);
        Task<Clinic> CreateAsync(CreateClinicDto clinicDto);
        Task<Clinic?> UpdateAsync(int id, UpdateClinicDto clinicDto);
        Task<Clinic?> DeleteAsync(int id);

        Task<bool> ClinicExists(int id);


    }


}