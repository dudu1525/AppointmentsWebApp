using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using System.Linq;
using System.Threading.Tasks;
using api.Models;


namespace api.Data
{
    
    public class ApplicationDBContext: DbContext //links up database to the code 
    {


        public ApplicationDBContext(DbContextOptions dbContextOptions)
        : base(dbContextOptions) 
        {

        }

        public DbSet<Clinic> Clinic { get; set; }
        public DbSet<Appointment> Appointment { get; set; }
        
        public DbSet<Doctor> Doctor { get; set; }

        public DbSet<User> User { get; set; }

        public DbSet<Assistant> Assistant { get; set; }

        public DbSet<Patient> Patient { get; set; }
    }


}