import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnh, setCnh] = useState("");
  const [isRideshareDriver, setIsRideshareDriver] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const client = {
      name,
      email,
      phone,
      cpf,
      cnh,
      isRideshareDriver,
    };

    console.log("Client data:", client);
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
          <p>Typed name: {name}</p>
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
          <p>Typed email: {email}</p>
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
          <p>Typed phone: {phone}</p>
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
          <p>Typed CPF: {cpf}</p>
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
          <p>Typed CNH: {cnh}</p>
        </div>

        <div>
          <label htmlFor="rideshare">Rideshare Driver:</label>
          <input
            type="checkbox"
            id="rideshare"
            checked={isRideshareDriver}
            onChange={(event) => setIsRideshareDriver(event.target.checked)}
          />
          <p>Rideshare Driver: {isRideshareDriver ? "Yes" : "No"}</p>
        </div>
        <button type="submit">Register Client</button>
      </form>
    </div>
  );
}

export default App;
