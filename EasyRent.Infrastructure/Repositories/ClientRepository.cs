using Microsoft.Data.SqlClient;
using EasyRent.Domain.Entities;

public class ClientRepository
{
    private readonly string connectionString = "Server=PAULO;DataBase=EASY_RENT_2;Integrated Security=True;TrustServerCertificate=True;";

    public int AddClient(Client client)
    {
        using SqlConnection connection = new SqlConnection(connectionString);
        connection.Open();

        string query = @"INSERT INTO Client (Name, Email, Phone, CPF, CNH, IsRideshareDriver)
            OUTPUT INSERTED.Id
            VALUES (@Name, @Email, @Phone, @CPF, @CNH, @IsRideshareDriver)";
        
        using SqlCommand command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@Name", client.Name);
        command.Parameters.AddWithValue("@Email", client.Email);
        command.Parameters.AddWithValue("@Phone", client.Phone);
        command.Parameters.AddWithValue("@CPF", client.CPF);
        command.Parameters.AddWithValue("@CNH", client.CNH);
        command.Parameters.AddWithValue("@IsRideshareDriver", client.IsRideshareDriver);
        int id = Convert.ToInt32(command.ExecuteScalar());
        client.Id = id;

        return id;
    }
}   