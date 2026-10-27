using Microsoft.AspNetCore.Mvc;
using EasyRent.Domain.Entities;
using EasyRent.Infrastructure.Repositories;
using EasyRent.Api.DTOs;

namespace EasyRent.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly ClientRepository _clientRepository;

    public ClientsController(ClientRepository clientRepository)
    {
        _clientRepository = clientRepository;
    }

    [HttpPost]
    public IActionResult AddClient([FromBody] CreateClientDto dto)
    {
        Client client = new Client(
            dto.Name,
            dto.Email,
            dto.Phone,
            dto.CPF,
            dto.CNH,
            dto.IsRideshareDriver
            );
        
        int id = _clientRepository.AddClient(client);
        return Ok(id);
    }

    [HttpGet]
    public IActionResult GetAllClients()
    {
        List<Client> clients = _clientRepository.GetAllClients();
        List<ClientResponseDto> responses = new List<ClientResponseDto>();

        foreach (Client c in clients)
        {
            ClientResponseDto clientDto = new ClientResponseDto
            {
                Id = c.Id,
                Name = c.Name,
                Email = c.Email,
                Phone = c.Phone,
                CPF = c.CPF,
                CNH = c.CNH,
                IsRideshareDriver = c.IsRideshareDriver
            };
            responses.Add(clientDto);
        }        
        return Ok(responses);
    }

    [HttpGet("{id}")]
    public IActionResult GetClient(int id)
    {
        Client? client = _clientRepository.GetClient(id);
        if (client == null)
        {
            return NotFound();
        }
        ClientResponseDto response = new ClientResponseDto
        {
            Id = client.Id,
            Name = client.Name,
            Email = client.Email,
            Phone = client.Phone,
            CPF = client.CPF,
            CNH = client.CNH,
            IsRideshareDriver = client.IsRideshareDriver
        };
        return Ok(response);
    }

    [HttpPut("{id}")]
    public IActionResult PutClient(int id, [FromBody] UpdateClientDto dto)
    {
        Client? client = _clientRepository.GetClient(id);
        if (client == null)
        {
            return NotFound();
        }
        client.Name = dto.Name;
        client.Email = dto.Email;
        client.Phone = dto.Phone;
        client.IsRideshareDriver = dto.IsRideshareDriver;

        bool updated = _clientRepository.UpdateClient(client);
        if (!updated)
        {
            return NotFound();
        }
        return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteClient(int id)
    {
        bool deleted = _clientRepository.DeleteClient(id);
        if (!deleted)
        {
            return NotFound();
        }
        return Ok();
    }
}
