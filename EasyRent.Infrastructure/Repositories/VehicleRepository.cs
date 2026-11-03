using Microsoft.Data.SqlClient;
using EasyRent.Domain.Entities;
using Microsoft.Extensions.Configuration;

namespace EasyRent.Infrastructure.Repositories;

public class VehicleRepository
{
    private readonly string connectionString;

    public VehicleRepository(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("EasyRent") ?? throw new InvalidOperationException("Connection string not found");
    }

    public int AddVehicle(Vehicle vehicle)
    {
        using SqlConnection connection = new SqlConnection(connectionString);
        connection.Open();

        string query = @"INSERT INTO VEHICLE (Model, Brand, CarBody, Color, CarYear, DailyRate, LicensePlate, IsAvailable)
                        OUTPUT INSERTED.Id
                        VALUES (@Model, @Brand, @CarBody, @Color, @CarYear, @DailyRate, @LicensePlate, @IsAvailable)";

        using SqlCommand command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@Model", vehicle.Model);
        command.Parameters.AddWithValue("@Brand", vehicle.Brand);
        command.Parameters.AddWithValue("@CarBody", (int)vehicle.CarBody);
        command.Parameters.AddWithValue("@Color", vehicle.Color);
        command.Parameters.AddWithValue("@CarYear", vehicle.CarYear);
        command.Parameters.AddWithValue("@DailyRate", vehicle.DailyRate);
        command.Parameters.AddWithValue("@LicensePlate", vehicle.LicensePlate);
        command.Parameters.AddWithValue("@IsAvailable", vehicle.IsAvailable);
        int id = Convert.ToInt32(command.ExecuteScalar());
        vehicle.SetId(id);

        return id;
    }
}
