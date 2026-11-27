using System.ComponentModel.DataAnnotations;

using EasyRent.Domain.Enums;

namespace EasyRent.Api.DTOs;

public class CreateVehicleDto
{
    [Required]
    public string Model { get; set; } = string.Empty;
    [Required]
    public string Brand { get; set; } = string.Empty;

    [EnumDataType(typeof(CarBody))]
    public CarBody CarBody { get; set; }
    [Required]
    public string Color { get; set; } = string.Empty;

    [Range(1900, 2100)]
    public int CarYear { get; set; }
    
    [Range(1, 10000, ErrorMessage = "Daily rate must be between $ 1.00 and $ 10000.00")]
    public decimal DailyRate { get; set; }
    [Required]
    [RegularExpression(@"^[A-Z]{3}[0-9]{4}$", ErrorMessage = "License plate must be in format AAA9999")]
    public string LicensePlate { get; set; } = string.Empty;
}
