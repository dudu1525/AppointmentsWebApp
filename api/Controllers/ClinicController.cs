
using api.Data;
//using api.Dtos.Clinic;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;
namespace api.Controllers
{

    [Route("api/clinics")]
    [ApiController]
    public class ClinicController : ControllerBase
    {
         private readonly IClinicRepo clinicrepo;
        public ClinicController( IClinicRepo cclinicrepo)
        {
            clinicrepo = cclinicrepo;
        }
    }



}
