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
  const [vehicle, setVehicle] = useState(null);
  const [vehicleId, setVehicleId] = useState("");
  const [searchError, setSearchError] = useState("");
  const [updateValidationErrors, setUpdateValidationErrors] = useState([]);

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

  async function getVehicleById(id) {
    setVehicle(null);
    setSearchError("");
    setUpdateValidationErrors([]);
    try {
      const response = await fetch(`https://localhost:7156/api/Vehicles/${id}`);

      if (response.ok) {
        const data = await response.json();
        setVehicle(data);
        console.log(data);
      } else if (response.status === 404) {
        setSearchError("Vehicle not found");
      } else {
        console.log("Error fetching vehicle.");
      }
    } catch (error) {
      console.error("Error fetching vehicle by ID:", error);
    }
  }

  async function handleUpdate(event) {
    event.preventDefault();
    const updatedVehicle = {
      model: vehicle.model,
      brand: vehicle.brand,
      carBody: Number(vehicle.carBody),
      color: vehicle.color,
      carYear: Number(vehicle.carYear),
      dailyRate: Number(vehicle.dailyRate),
      licensePlate: vehicle.licensePlate,
    };

    try {
      const response = await fetch(
        `https://localhost:7156/api/vehicles/${vehicle.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedVehicle),
        },
      );

      if (response.ok) {
        console.log("Vehicle updated successfully");
        setUpdateValidationErrors([]);
        await getAllVehicles();
      } else if (response.status === 400) {
        const data = await response.json();

        const errors = Object.values(data.errors ?? {}).flat();

        setUpdateValidationErrors(errors);
      } else if (response.status === 409) {
        const message = await response.text();
        setUpdateValidationErrors([message]);
      } else {
        console.log("Failed to update vehicle");
      }
    } catch (error) {
      console.error("Error updating vehicle:", error);
    }
  }

  async function deactivateVehicle() {
    if (!window.confirm("Are you sure you want to deactivate this vehicle?")) {
      return;
    }
    try {
      const response = await fetch(
        `https://localhost:7156/api/vehicles/${vehicle.id}/deactivate`,
        {
          method: "PATCH",
        },
      );

      if (response.ok) {
        console.log("Vehicle deactivated successfully");
        setVehicle(null);
        await getAllVehicles();
      } else {
        console.log("Failed to deactivate vehicle");
      }
    } catch (error) {
      console.error("Error deactivating vehicle: ", error);
    }
  }

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

      <div className="search-card">
        <h2>Get Vehicle by ID</h2>
        <input
          type="number"
          placeholder="Enter vehicle ID"
          value={vehicleId}
          onChange={(event) => setVehicleId(event.target.value)}
        />
        <button onClick={() => getVehicleById(vehicleId)}>Search</button>
        {searchError && <p className="search-error">⚠️ {searchError}</p>}

        {vehicle && (
          <form onSubmit={handleUpdate} className="update-form">
            <h3>Vehicle Details</h3>
            <div>
              <label htmlFor="updateModel">Model:</label>
              <input
                type="text"
                id="updateModel"
                name="updateModel"
                value={vehicle.model}
                onChange={(event) =>
                  setVehicle({ ...vehicle, model: event.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="updateBrand">Brand:</label>
              <input
                type="text"
                id="updateBrand"
                name="updateBrand"
                value={vehicle.brand}
                onChange={(event) =>
                  setVehicle({ ...vehicle, brand: event.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updateCarBody">Car Body:</label>

              <select
                id="updateCarBody"
                name="updateCarBody"
                value={vehicle.carBody}
                onChange={(event) =>
                  setVehicle({ ...vehicle, carBody: event.target.value })
                }
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
              <label htmlFor="updateColor">Color:</label>
              <input
                type="text"
                id="updateColor"
                name="updateColor"
                value={vehicle.color}
                onChange={(event) =>
                  setVehicle({ ...vehicle, color: event.target.value })
                }
              />
            </div>
            <div>
              <label htmlFor="updateCarYear">Car Year:</label>
              <input
                type="number"
                id="updateCarYear"
                name="updateCarYear"
                min="1990"
                max="2026"
                value={vehicle.carYear}
                onChange={(event) =>
                  setVehicle({ ...vehicle, carYear: event.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="updateDailyRate">Daily Rate $:</label>
              <input
                type="number"
                step="0.01"
                id="updateDailyRate"
                name="updateDailyRate"
                value={vehicle.dailyRate}
                onChange={(event) =>
                  setVehicle({ ...vehicle, dailyRate: event.target.value })
                }
              />
            </div>

            <div>
              <label htmlFor="updateLicensePlate">License Plate:</label>
              <input
                type="text"
                id="updateLicensePlate"
                name="updateLicensePlate"
                value={vehicle.licensePlate}
                onChange={(event) =>
                  setVehicle({ ...vehicle, licensePlate: event.target.value })
                }
              />
            </div>
            
            <div className="form-actions">
              <button type="submit">Update Vehicle</button>
              <button
                type="button"
                className="delete-button"
                onClick={deactivateVehicle}
              >
                Deactivate Vehicle
              </button>
            </div>

            {updateValidationErrors.length > 0 && (
              <div className="validation-alert">
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

export default VehicleManagement;
