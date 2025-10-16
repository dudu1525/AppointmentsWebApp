
using api.Dtos.Doctor;
using api.Models;

namespace api.Interfaces
{

    public interface IClinicRepo
    {

        Task<bool> ClinicExists(int id);


    }


}