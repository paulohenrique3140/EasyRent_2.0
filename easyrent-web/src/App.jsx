import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnh, setCnh] = useState("");
  const [isRideshareDriver, setIsRideshareDriver] = useState(false);
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [clientId, setClientId] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const client = {
      name,
      email,
      phone,
      cpf,
      cnh,
      isRideshareDriver,
    };

    try {
      const response = await fetch("https://localhost:7156/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      if (response.ok) {
        console.log("client registered successfully");
        await getAllClients();
      } else {
        console.log("Failed to register client");
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  }

  async function getAllClients() {
    try {
      const response = await fetch("https://localhost:7156/api/clients");

      if (response.ok) {
        const data = await response.json();
        setClients(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  }

  useEffect(() => {
    getAllClients();
  }, []);

  async function getClientById(id) {
    setClient(null);
    try {
      const response = await fetch(`https://localhost:7156/api/clients/${id}`);

      if (response.ok) {
        const data = await response.json();
        setClient(data);
        console.log(data);
      } else if (response.status === 404) {
        console.log("Client not found");
      } else {
        console.log("Error fetching client.");
      }
    } catch (error) {
      console.error("Error fetching client by ID:", error);
    }
  }

  return (
    <div>
      <h1>EasyRent 2.0</h1>
      <h2>Client management</h2>
      <p>Welcome to our vehicle rental system!</p>
      <h3>Register new client</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cpf">CPF:</label>
          <input
            type="text"
            id="cpf"
            name="cpf"
            value={cpf}
            onChange={(event) => setCpf(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cnh">CNH:</label>
          <input
            type="text"
            id="cnh"
            name="cnh"
            value={cnh}
            onChange={(event) => setCnh(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="rideshare">Rideshare Driver:</label>
          <input
            type="checkbox"
            id="rideshare"
            checked={isRideshareDriver}
            onChange={(event) => setIsRideshareDriver(event.target.checked)}
          />
        </div>
        <button type="submit">Register Client</button>
      </form>
      <div>
        <h2>Registered Clients</h2>
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              {client.name} - {client.email}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Get Client by ID</h2>
        <input
          type="number"
          placeholder="Enter client ID"
          value={clientId}
          onChange={(event) => setClientId(event.target.value)}
        />
        <button onClick={() => getClientById(clientId)}>Search</button>

        {client && (
          <div>
            <h3>Client Details</h3>
            <p>Name: {client.name}</p>
            <p>Email: {client.email}</p>
            <p>Phone: {client.phone}</p>
            <p>CPF: {client.cpf}</p>
            <p>CNH: {client.cnh}</p>
            <p>Rideshare Driver: {client.isRideshareDriver ? "Yes" : "No"}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
