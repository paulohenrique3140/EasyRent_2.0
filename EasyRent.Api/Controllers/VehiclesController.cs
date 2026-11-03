using EasyRent.Api.DTOs;
using EasyRent.Domain.Entities;
using EasyRent.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace EasyRent.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehiclesController : ControllerBase
{
    private readonly VehicleRepository _vehicleRepository;

    public VehiclesController(VehicleRepository vehicleRepository)
    {
        _vehicleRepository = vehicleRepository;
    }

    [HttpPost]
    public IActionResult AddVehicle([FromBody] CreateVehicleDto dto)
    {
        Vehicle vehicle = new Vehicle(
            dto.Model,
            dto.Brand,
            dto.CarBody,
            dto.Color,
            dto.CarYear,
            dto.DailyRate,
            dto.LicensePlate
            );
        try
        {
            int id = _vehicleRepository.AddVehicle(vehicle);
            return Ok(id);
        }
        catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601)
        {
            return Conflict("License Plate already registered.");
        }
    }
}
