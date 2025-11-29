

using api.Models;

public class PatientDetailsDto
{   public int UserId { get; set; }
    public string Name {get;set;}
    public int PatientId { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
     public List<Appointment> Appointments { get; set; } = new List<Appointment>();

}