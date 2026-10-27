using System.ComponentModel.DataAnnotations;

namespace EasyRent.Api.DTOs;

public class CreateClientDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^\d{10,11}$", ErrorMessage = "Phone must contain 10 or 11 digits.")]
    public string Phone { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^\d{11}$", ErrorMessage = "CPF must contain exactly 11 digits.")]
    public string CPF { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^\d{11}$", ErrorMessage = "CNH must contain exactly 11 digits.")]
    public string CNH { get; set; } = string.Empty;
    public bool IsRideshareDriver { get; set; }
}
