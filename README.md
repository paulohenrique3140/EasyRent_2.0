# EasyRent 2.0 🚗

**Full-Stack Vehicle Rental Management System**

EasyRent 2.0 is a full-stack application developed as part of my journey from IT Support Analyst to Software Developer.

The project focuses on applying software development fundamentals through a real-world business scenario, including object-oriented programming, relational databases, REST APIs, and frontend development.

Development follows an **incremental approach**, starting with client management and gradually expanding into additional business modules.

## Project Status

**Current release: Client Management MVP**

The first development milestone delivers a functional client management module, connecting a React frontend to an ASP.NET Core Web API and a SQL Server database.

This is an educational project under active development, not a production-ready application.

## Technologies

| Layer | Technology |
|---|---|
| Backend | C#, ASP.NET Core Web API |
| Frontend | React, JavaScript, JSX, CSS |
| Frontend tooling | Vite, npm |
| Database | Microsoft SQL Server |
| Data access | ADO.NET, Microsoft.Data.SqlClient |
| API documentation | ASP.NET Core OpenAPI |
| Version control | Git and GitHub |
| Development tools | Visual Studio, VS Code, SQL Server Management Studio |

## Architecture

The solution is organized into three backend projects and one frontend application.

```text
EasyRent_2.0/
├── EasyRent.Api/
│   ├── Controllers/
│   ├── DTOs/
│   └── Program.cs
│
├── EasyRent.Domain/
│   └── Entities/
│
├── EasyRent.Infrastructure/
│   └── Repositories/
│
├── easyrent-web/
│   ├── public/
│   └── src/
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
└── EasyRent_2.0.slnx
```

### Backend responsibilities

**EasyRent.Domain** contains the domain entities and represents the application's core business data.

**EasyRent.Infrastructure** handles database operations using ADO.NET and parameterized SQL queries.

**EasyRent.Api** exposes HTTP endpoints, receives and validates requests, and coordinates operations through the repository.

### Frontend responsibilities

**easyrent-web** provides the user interface using React, managing component state, handling forms, sending HTTP requests, and displaying API responses.

### Application Flow

```text
React Frontend
      |
      | HTTP Requests (JSON)
      v
ASP.NET Core Web API
      |
      v
ClientsController
      |
      v
ClientRepository
      |
      | ADO.NET / SQL
      v
SQL Server Database
```

## Implemented Features

### Client Management

- Register new clients.
- Display registered clients.
- Search for clients by ID.
- Update client information.
- Delete clients with user confirmation.
- Identify rideshare drivers.
- Preserve CPF and CNH during client updates.

### Validation and Error Handling

- Required-field validation.
- Email format validation.
- Phone number format validation.
- CPF and CNH length and numeric-format validation.
- Database uniqueness constraints for email, CPF, and CNH.
- HTTP 400 responses for invalid requests.
- HTTP 404 responses when a client is not found.
- HTTP 409 responses for duplicate records.
- Validation feedback displayed in the React interface.

**Note:** CPF and CNH validation currently checks their numeric format and length. Full verification of official check digits is not yet implemented.

### User Interface

- Client registration form.
- Registered clients table.
- Client search and editing interface.
- Responsive layouts using CSS Grid and media queries.
- Visual feedback for validation errors.
- Distinct styling for update and delete actions.

## REST API Endpoints

Base route: `/api/clients`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/clients` | Register a client |
| GET | `/api/clients` | Retrieve all clients |
| GET | `/api/clients/{id}` | Retrieve a client by ID |
| PUT | `/api/clients/{id}` | Update a client |
| DELETE | `/api/clients/{id}` | Delete a client |

The API uses Data Transfer Objects (DTOs) to separate request and response data from domain entities.

## Database

The current version uses Microsoft SQL Server with a `Client` table.

### Client Entity

| Property | Description |
|---|---|
| Id | Unique client identifier |
| Name | Client's full name |
| Email | Unique email address |
| Phone | Contact phone number |
| CPF | Unique Brazilian taxpayer identification number |
| CNH | Unique Brazilian driver's license number |
| IsRideshareDriver | Indicates whether the client is a rideshare driver |

Database operations are implemented with ADO.NET, using `SqlConnection`, `SqlCommand`, `SqlDataReader`, and parameterized queries.

The project intentionally uses direct SQL rather than an Object-Relational Mapper (ORM), allowing deeper practice with relational databases and data access fundamentals.

## Running the Project Locally

### Prerequisites

- .NET SDK compatible with the solution.
- Node.js and npm.
- Microsoft SQL Server.
- Git.
- Visual Studio or another compatible .NET development environment.
- VS Code or another frontend editor.

### 1. Clone the Repository

```bash
git clone https://github.com/paulohenrique3140/EasyRent_2.0.git
cd EasyRent_2.0
git checkout feature/client-registration
```

### 2. Configure the Database

Create a local SQL Server database named `EASY_RENT_2` and a `Client` table matching the current entity and database constraints.

Configure the `EasyRent` connection string in the API's local development settings to match your SQL Server instance.

The repository does not currently include a database migration or initialization script, so the database schema must be prepared separately.

### 3. Run the Backend

```bash
cd EasyRent.Api
dotnet restore
dotnet run
```

The React application currently expects the API at:

`https://localhost:7156`

Verify the active backend URL and local HTTPS development certificate before starting the frontend.

### 4. Run the Frontend

Open another terminal:

```bash
cd easyrent-web
npm install
npm run dev
```

Open the application at:

`http://localhost:5173`

The frontend currently uses a local API URL configured directly in `App.jsx`. If the backend runs on a different port, update that URL accordingly.

## Development Approach

EasyRent 2.0 is being built incrementally to consolidate knowledge before introducing more advanced concepts.

The first milestone focuses on understanding the complete flow between:

1. User interaction in React.
2. HTTP requests to the ASP.NET Core API.
3. Request validation and domain objects.
4. Database operations using ADO.NET.
5. HTTP responses and frontend state updates.

The main goal is not only to deliver working features, but also to understand the responsibilities of each application layer and the technical decisions behind the implementation.

## Future Roadmap

The following features are planned or under consideration and are **not part of the current release**.

- Vehicle management.
- Vehicle rental management.
- Rental availability and pricing.
- Rental history and business rules.
- Authentication and authorization.
- Automated tests.
- Improved error handling and configuration management.
- Airline-related services.
- Accommodation-related services.
- Additional integrations and business modules.

The architecture and domain model will evolve as requirements become clearer.

## Current Limitations

This release is intended for learning and local demonstration.

It does not yet include production authentication, authorization, comprehensive automated testing, database migrations, or deployment configuration.

Sensitive personal data such as CPF and CNH requires appropriate privacy and security controls before the application can be considered for real-world use.

## Author

**Paulo Henrique**

Software Developer in training | C# / .NET | SQL Server | React

GitHub: [paulohenrique3140](https://github.com/paulohenrique3140)

---

*EasyRent 2.0 — Learning software development by building, testing, and improving real applications.*