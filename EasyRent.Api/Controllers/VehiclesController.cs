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

    [HttpGet]
    public IActionResult GetAllVehicles()
    {
        List<Vehicle> vehicles = _vehicleRepository.GetAllVehicles();
        List<VehicleResponseDto> responses = new List<VehicleResponseDto>();

        foreach (Vehicle v in vehicles)
        {
            VehicleResponseDto vehicleDto = new VehicleResponseDto
            {
                Id = v.Id,
                Model = v.Model,
                Brand = v.Brand,
                CarBody = v.CarBody,
                Color = v.Color,
                CarYear = v.CarYear,
                DailyRate = v.DailyRate,
                LicensePlate = v.LicensePlate,
                IsAvailable = v.IsAvailable,
                IsActive = v.IsActive
            };
            responses.Add(vehicleDto);
        }
        return Ok(responses);
    }

    [HttpGet("{id}")]
    public IActionResult GetVehicle(int id)
    {
        Vehicle? vehicle = _vehicleRepository.GetVehicle(id);
        if (vehicle == null)
        {
            return NotFound();
        }
        VehicleResponseDto response = new VehicleResponseDto
        {
            Id = vehicle.Id,
            Model = vehicle.Model,
            Brand = vehicle.Brand,
            CarBody = vehicle.CarBody,
            Color = vehicle.Color,
            CarYear = vehicle.CarYear,
            DailyRate = vehicle.DailyRate,
            LicensePlate = vehicle.LicensePlate,
            IsAvailable = vehicle.IsAvailable,
            IsActive = vehicle.IsActive
        };
        return Ok(response);
    }
    [HttpPut("{id}")]
    public IActionResult UpdateVehicle(int id, [FromBody] UpdateVehicleDto dto)
    {
        Vehicle? vehicle = _vehicleRepository.GetVehicle(id);
        if(vehicle == null)
        {
            return NotFound();
        }
        vehicle.Model = dto.Model;
        vehicle.Brand = dto.Brand;
        vehicle.CarBody = dto.CarBody;
        vehicle.Color = dto.Color;
        vehicle.CarYear = dto.CarYear;
        vehicle.UpdateDailyRate(dto.DailyRate);
        vehicle.LicensePlate = dto.LicensePlate;

        try
        {
            bool updated = _vehicleRepository.UpdateVehicle(vehicle);
            if (!updated)
            {
                return NotFound();
            }
            return Ok();
        }
        catch (SqlException ex) when (ex.Number == 2627 || ex.Number == 2601)
        {
            return Conflict("License Plate already registered.");
        }
    }

    [HttpPatch("{id}/deactivate")]
    public IActionResult DeactivateVehicle(int id)
    {
        bool deactivated = _vehicleRepository.DeactivateVehicle(id);
        if (!deactivated)
        {
            return NotFound();
        }
        return NoContent();
    }


}
