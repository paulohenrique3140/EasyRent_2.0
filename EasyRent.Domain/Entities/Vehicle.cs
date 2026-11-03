using EasyRent.Domain.Enums;
namespace EasyRent.Domain.Entities;

public class Vehicle
{
    public int Id { get; private set; }
    public string Model { get; set; }
    public string Brand { get; set; }
    public CarBody CarBody { get; set; }
    public string Color { get; set; }
    public int CarYear { get; set; }
    public decimal DailyRate { get; private set; }
    public string LicensePlate { get; set; }
    public bool IsAvailable { get; private set; } = true;

    public Vehicle(string model, string brand, CarBody carBody, string color, int carYear, decimal dailyRate, string licensePlate)
    {
        Model = model;
        Brand = brand;
        CarBody = carBody;
        Color = color;
        CarYear = carYear;
        UpdateDailyRate(dailyRate);
        LicensePlate = licensePlate;
    }

    public void UpdateDailyRate(decimal dailyRate)
    {
        if (dailyRate <= 0)
        {
            throw new ArgumentException("Daily rate must be greater than zero.");
        }

        DailyRate = dailyRate;
    }

    public void SetId(int id)
    {
        if (Id != 0)
            throw new InvalidOperationException("Vehicle ID has already been assigned.");

        Id = id;
    }

    public void UpdateAvailability(bool isAvailable)
    {
        IsAvailable = isAvailable;
    }
}
