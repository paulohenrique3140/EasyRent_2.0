import { useState, useEffect } from "react";

function VehicleManagement() {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [carBody, setCarBody] = useState("");
  const [color, setColor] = useState("");
  const [carYear, setCarYear] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicles, setVehicles] = useState([]);
  const [validationErrors, setValidationErrors] = useState([]);

  async function handleSubmit(event) {
    event.preventDefault();

    const vehicle = {
      model,
      brand,
      carBody: Number(carBody),
      color,
      carYear: Number(carYear),
      dailyRate: Number(dailyRate),
      licensePlate,
    };

    try {
      const response = await fetch("https://localhost:7156/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vehicle),
      });

      if (response.ok) {
        console.log("Vehicle registered successfully");
        setValidationErrors([]);
        await getAllVehicles();
      } else if (response.status === 400) {
        const data = await response.json();
        const errors = Object.values(data.errors ?? {}).flat();
        setValidationErrors(errors);
      } else if (response.status === 409) {
        const message = await response.text();
        setValidationErrors([message]);
      } else {
        console.log("Failed to register vehicle");
      }
    } catch (error) {
      console.error("Request error:", error);
    }
  }

    async function getAllVehicles() {
      try {
        const response = await fetch("https://localhost:7156/api/vehicles");
  
        if (response.ok) {
          const data = await response.json();
          setVehicles(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching vehicles:", error);
      }
    }
  
    useEffect(() => {
      getAllVehicles();
    }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>EasyRent 2.0</h1>
        <p>Vehicle Management</p>
      </header>
      <section className="form-card">
        <h3>Register new vehicle</h3>
        <form onSubmit={handleSubmit} className="management-form">
          <div>
            <label htmlFor="model">Model:</label>
            <input
              type="text"
              id="model"
              name="model"
              value={model}
              onChange={(event) => setModel(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="brand">Brand:</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="carBody">Car Body:</label>

            <select
              id="carBody"
              name="carBody"
              value={carBody}
              onChange={(event) => setCarBody(event.target.value)}
            >
              <option value="">Select car body</option>
              <option value="1">Hatchback</option>
              <option value="2">Sedan</option>
              <option value="3">SUV</option>
              <option value="4">Pickup</option>
              <option value="5">Minivan</option>
            </select>
          </div>

          <div>
            <label htmlFor="color">Color:</label>
            <input
              type="text"
              id="color"
              name="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="carYear">Car Year:</label>
            <input
              type="number"
              id="carYear"
              name="carYear"
              min="1990"
              max="2026"
              value={carYear}
              onChange={(event) => setCarYear(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="dailyRate">Daily Rate: $</label>
            <input
              type="number"
              step="0.01"
              id="dailyRate"
              name="dailyRate"
              value={dailyRate}
              onChange={(event) => setDailyRate(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="licensePlate">License Plate:</label>
            <input
              type="text"
              id="licensePlate"
              name="licensePlate"
              value={licensePlate}
              onChange={(event) => setLicensePlate(event.target.value)}
            />
          </div>
          <button type="submit">Register Vehicle</button>
        </form>
      </section>

      {validationErrors.length > 0 && (
        <div className="validation-alert">
          <h4>Validation Errors:</h4>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <section className="management-card">
        <h2>Registered Vehicles</h2>
        <div className="table-wrapper">
          <table className="management-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Brand</th>
                <th>Model</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td>{vehicle.id}</td>
                  <td>{vehicle.brand}</td>
                  <td>{vehicle.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default VehicleManagement;
