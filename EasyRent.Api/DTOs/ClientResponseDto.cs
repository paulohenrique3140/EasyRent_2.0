namespace EasyRent.Api.DTOs;

public class ClientResponseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string CPF { get; set; } = string.Empty;
    public string CNH { get; set; } = string.Empty;
    public bool IsRideshareDriver { get; set; }
}
