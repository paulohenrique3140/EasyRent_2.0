using Microsoft.Data.SqlClient;
using EasyRent.Domain.Entities;

namespace EasyRent.Infrastructure.Repositories;

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

    public List<Client> GetAllClients()
    {
        using SqlConnection connection = new SqlConnection(connectionString);
        connection.Open();
        List<Client> clients = new List<Client>();

        string query = @"SELECT Id, Name, Email, Phone, CPF, CNH, IsRideshareDriver
                         FROM Client";
        using SqlCommand command = new SqlCommand(query, connection);
        using SqlDataReader reader = command.ExecuteReader();
        while (reader.Read())
        {
            Client client = new Client(
                reader["Name"].ToString()!,
                reader["Email"].ToString()!,
                reader["Phone"].ToString()!,
                reader["CPF"].ToString()!,
                reader["CNH"].ToString()!,
                Convert.ToBoolean(reader["IsRideshareDriver"])
                );
            client.Id = Convert.ToInt32(reader["Id"]);
            clients.Add(client);
        }

        return clients;
    }
    public Client? GetClient(int id)
    {
        using SqlConnection connection = new SqlConnection(connectionString);
        connection.Open();

        string query = @"SELECT Id, Name, Email, Phone, CPF, CNH, IsRideshareDriver
                        FROM Client WHERE Id = @Id";

        using SqlCommand command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@Id", id);
        using SqlDataReader reader = command.ExecuteReader();
        if (reader.Read())
        {
            Client client = new Client(
                reader["Name"].ToString()!,
                reader["Email"].ToString()!,
                reader["Phone"].ToString()!,
                reader["CPF"].ToString()!,
                reader["CNH"].ToString()!,
                Convert.ToBoolean(reader["IsRideshareDriver"])
                );
            client.Id = Convert.ToInt32(reader["Id"]);
            return client;
        }
        return null;        
    }
}

