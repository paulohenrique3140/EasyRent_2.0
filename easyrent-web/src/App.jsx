import { useState, useEffect } from "react";
import "./App.css";

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
  const [validationErrors, setValidationErrors] = useState([]);
  const [updateValidationErrors, setUpdateValidationErrors] = useState([]);

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
        console.log("Client registered successfully");
        setValidationErrors([]);
        await getAllClients();
      } else if (response.status === 400) {
        const data = await response.json();

        const errors = Object.values(data.errors ?? {}).flat();

        setValidationErrors(errors);
      } else if (response.status === 409) {
        const message = await response.text();
        setValidationErrors([message]);
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
    setUpdateValidationErrors([]);
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

  async function handleUpdate(event) {
    event.preventDefault();
    const updatedClient = {
      name: client.name,
      email: client.email,
      phone: client.phone,
      isRideshareDriver: client.isRideshareDriver,
    };

    try {
      const response = await fetch(
        `https://localhost:7156/api/clients/${client.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedClient),
        },
      );

      if (response.ok) {
        console.log("Client updated successfully");
        setUpdateValidationErrors([]);
        await getAllClients();
      } else if (response.status === 400) {
        const data = await response.json();

        const errors = Object.values(data.errors ?? {}).flat();

        setUpdateValidationErrors(errors);
      } else if (response.status === 409) {
        const message = await response.text();
        setUpdateValidationErrors([message]);
      } else {
        console.log("Failed to update client");
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  }

  async function deleteClient() {
    if (!window.confirm("Are you sure you want to delete this client?")) {
      return;
    }
    try {
      const response = await fetch(
        `https://localhost:7156/api/clients/${client.id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        console.log("Client deleted successfully");
        setClient(null);
        await getAllClients();
      } else {
        console.log("Failed to delete client");
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>EasyRent 2.0</h1>
        <p>Client management</p>
      </header>

      <p>Welcome to our vehicle rental system!</p>

      <section className="form-card">
        <h3>Register new client</h3>
        <form onSubmit={handleSubmit} className="client-form">
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
              placeholder="Somente números"
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

          <div className="checkbox-group">
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
      </section>

      {validationErrors.length > 0 && (
        <div>
          <h4>Validation Errors:</h4>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
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
          <form onSubmit={handleUpdate}>
            <h3>Client Details</h3>
            <label htmlFor="updateName">Name:</label>
            <input
              type="text"
              id="updateName"
              name="updateName"
              value={client.name}
              onChange={(event) =>
                setClient({ ...client, name: event.target.value })
              }
            />
            <br />
            <label htmlFor="updateEmail">Email:</label>
            <input
              type="text"
              id="updateEmail"
              name="updateEmail"
              value={client.email}
              onChange={(event) =>
                setClient({ ...client, email: event.target.value })
              }
            />
            <label htmlFor="updatePhone">Phone:</label>
            <input
              type="text"
              id="updatePhone"
              name="updatePhone"
              value={client.phone}
              onChange={(event) =>
                setClient({ ...client, phone: event.target.value })
              }
            />
            <label htmlFor="updateCpf">CPF:</label>
            <input
              type="text"
              id="updateCpf"
              name="updateCpf"
              value={client.cpf}
              readOnly
            />
            <label htmlFor="updateCnh">CNH:</label>
            <input
              type="text"
              id="updateCnh"
              name="updateCnh"
              value={client.cnh}
              readOnly
            />
            <label htmlFor="updateIsRideshareDriver">Rideshare Driver:</label>
            <input
              type="checkbox"
              id="updateIsRideshareDriver"
              name="updateIsRideshareDriver"
              checked={client.isRideshareDriver}
              onChange={(event) =>
                setClient({
                  ...client,
                  isRideshareDriver: event.target.checked,
                })
              }
            />
            <button type="submit">Update Client</button>
            <button type="button" onClick={deleteClient}>
              Delete Client
            </button>
            {updateValidationErrors.length > 0 && (
              <div>
                <h4>Update Validation Errors:</h4>
                <ul>
                  {updateValidationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

export default App;
