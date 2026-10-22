namespace EasyRent.Domain.Entities;

public class Client
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string CPF { get; set; }
    public string CNH { get; set; }
    public bool IsRideshareDriver { get; set; }

    public Client(string name, string email, string phone, string cpf, string cnh, bool isRideshareDriver)
    {
        Name = name;
        Email = email;
        Phone = phone;
        CPF = cpf;
        CNH = cnh;
        IsRideshareDriver = isRideshareDriver;
    }
}
