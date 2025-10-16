
using api.Dtos.Doctor;
using api.Models;

namespace api.Interfaces
{

  public interface IDoctorRepo
  {
    Task<List<Doctor>> GetAllAsync();
    Task<Doctor?> GetByIdAsync(int id);

     Task<Doctor> CreateAsync(Doctor doctorModel);
  

    //  Task<User?> UpdateUserAsync(int id, UpdateUserRequestDto userDto);

    //  Task<Doctor?> DeleteAsync(int id);


  }


}