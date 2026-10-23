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
}
