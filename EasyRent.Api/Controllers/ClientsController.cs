using Microsoft.AspNetCore.Mvc;
using EasyRent.Domain.Entities;
using EasyRent.Infrastructure.Repositories;

namespace EasyRent.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly ClientRepository _clientRepository = new ClientRepository();

    [HttpPost]
    public IActionResult AddClient([FromBody] Client client)
    {
        int id = _clientRepository.AddClient(client);
        return Ok(id);
    }

    [HttpGet]
    public IActionResult GetAllClients()
    {
        List<Client> clients = _clientRepository.GetAllClients();
        return Ok(clients);
    }

    [HttpGet("{id}")]
    public IActionResult GetClient(int id)
    {
        Client? client = _clientRepository.GetClient(id);
        if (client == null)
        {
            return NotFound();
        }
        return Ok(client);
    }

    [HttpPut("{id}")]
    public IActionResult PutClient(int id, [FromBody] Client client)
    {
        client.Id = id;
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
