using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace backendd.Models
{
  public class User : IdentityUser
{
    public required string FullName { get; set; }
    public required string PhoneNumber { get; set; }
    public DateTime DateOfBirth { get; set; }
}

}
