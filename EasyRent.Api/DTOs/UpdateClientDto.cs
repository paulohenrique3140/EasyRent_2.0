using System.ComponentModel.DataAnnotations;

namespace EasyRent.Api.DTOs;

public class UpdateClientDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;
    public bool IsRideshareDriver { get; set; }
}
