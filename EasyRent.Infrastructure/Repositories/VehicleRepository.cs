using Microsoft.Data.SqlClient;
using EasyRent.Domain.Entities;
using EasyRent.Domain.Enums;
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

    public List<Vehicle> GetAllVehicles()
    {
        using SqlConnection connection = new SqlConnection(connectionString);
        connection.Open();
        List<Vehicle> vehicles = new List<Vehicle>();

        string query = @"SELECT Id, Model, Brand, CarBody, Color, CarYear, DailyRate, LicensePlate, IsAvailable
                        FROM Vehicle";

        using SqlCommand command = new SqlCommand(query, connection);
        using SqlDataReader reader = command.ExecuteReader();

        while (reader.Read())
        {
            Vehicle vehicle = new Vehicle(
                  reader["Model"].ToString(),
                  reader["Brand"].ToString(),
                  (CarBody)Convert.ToInt32(reader["CarBody"]),
                  reader["Color"].ToString(),
                  Convert.ToInt32(reader["CarYear"]),
                  Convert.ToDecimal(reader["DailyRate"]),
                  reader["LicensePlate"].ToString()
                );
            vehicle.SetId(Convert.ToInt32(reader["Id"]));
            vehicle.UpdateAvailability(Convert.ToBoolean(reader["IsAvailable"]));
            vehicles.Add(vehicle);
        }

        return vehicles;
    }
}
