public class Client
{
    public int Id { get; private set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Cpf { get; set; }
    public string Cnh { get; set; }
    public bool IsRideshareDriver { get; set; }

    public Client(string name, string email, string phone, string cpf, string cnh, bool isRideshareDriver)
    {
        Name = name;
        Email = email;
        Phone = phone;
        Cpf = cpf;
        Cnh = cnh;
        IsRideshareDriver = isRideshareDriver;
    }
}
