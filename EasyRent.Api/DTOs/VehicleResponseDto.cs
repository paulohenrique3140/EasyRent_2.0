using EasyRent.Domain.Enums;

namespace EasyRent.Api.DTOs;

public class VehicleResponseDto
{
    public int Id { get; set; }
    public string Model { get; set; } = string.Empty;
    public string Brand { get; set; } = string.Empty;
    public CarBody CarBody { get; set; }
    public string Color { get; set; } = string.Empty;
    public int CarYear { get; set; }
    public decimal DailyRate { get; set; }
    public string LicensePlate { get; set; } = string.Empty;
    public bool IsAvailable { get; set; }
}
