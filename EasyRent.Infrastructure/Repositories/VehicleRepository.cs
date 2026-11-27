using Microsoft.Data.SqlClient;
using EasyRent.Domain.Entities;
using EasyRent.Domain.Enums;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using System.Security.Cryptography;

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

        string query = @"SELECT Id, Model, Brand, CarBody, Color, CarYear, DailyRate, LicensePlate, IsAvailable, IsActive
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
            bool isActive = Convert.ToBoolean(reader["IsActive"]);
            if (!isActive)
            {
                vehicle.Deactivate();
            }
            vehicles.Add(vehicle);
        }

        return vehicles;
    }

    public Vehicle? GetVehicle(int id)
    {
        using SqlConnection connection = new SqlConnection(connectionString);
        connection.Open();

        string query = @"SELECT Id, Model, Brand, CarBody, Color, CarYear, DailyRate, LicensePlate, IsAvailable, IsActive
                        FROM Vehicle WHERE Id = @Id";

        using SqlCommand command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@Id", id);
        using SqlDataReader reader = command.ExecuteReader();
        if (reader.Read())
        {
            Vehicle vehicle = new Vehicle(
                reader["Model"].ToString()!,
                reader["Brand"].ToString()!,
                (CarBody)Convert.ToInt32(reader["CarBody"]),
                reader["Color"].ToString()!,
                Convert.ToInt32(reader["CarYear"]),
                Convert.ToDecimal(reader["DailyRate"]),
                reader["LicensePlate"].ToString()!
                );
            vehicle.SetId(Convert.ToInt32(reader["Id"]));
            bool isAvailable = Convert.ToBoolean(reader["IsAvailable"]);
            bool isActive = Convert.ToBoolean(reader["IsActive"]);
            vehicle.UpdateAvailability(isAvailable);
            if (!isActive)
            {
                vehicle.Deactivate();
            }
            return vehicle;
        }
        return null;
    }

    public bool UpdateVehicle(Vehicle vehicle)
    {
        using SqlConnection connection = new SqlConnection(connectionString);
        connection.Open();

        string query = @"Update Vehicle SET Model = @Model,
                         Brand = @Brand,
                         CarBody = @CarBody,
                         Color = @Color,
                         CarYear = @CarYear,
                         DailyRate = @DailyRate,
                         LicensePlate = @LicensePlate
                         WHERE Id = @Id";

        using SqlCommand command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@Model", vehicle.Model);
        command.Parameters.AddWithValue("@Brand", vehicle.Brand);
        command.Parameters.AddWithValue("@CarBody", (int)vehicle.CarBody);
        command.Parameters.AddWithValue("@Color", vehicle.Color);
        command.Parameters.AddWithValue("@CarYear", vehicle.CarYear);
        command.Parameters.AddWithValue("@DailyRate", vehicle.DailyRate);
        command.Parameters.AddWithValue("@LicensePlate", vehicle.LicensePlate);
        command.Parameters.AddWithValue("@Id", vehicle.Id);

        return command.ExecuteNonQuery() > 0;
    }

    public bool DeactivateVehicle(int id)
    {
        using SqlConnection connection = new SqlConnection(connectionString);
        connection.Open();

        string query = @"UPDATE VEHICLE 
                        SET IsActive = 0
                        WHERE Id = @Id AND IsActive = 1";

        using SqlCommand command = new SqlCommand(query, connection);
        command.Parameters.AddWithValue("@Id", id);
        return command.ExecuteNonQuery() > 0;
    }
}
