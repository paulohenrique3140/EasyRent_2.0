# EasyRent 2.0 🚗

**Full-Stack Vehicle Rental Management System**

EasyRent 2.0 is a full-stack application developed as part of my transition from IT Support Analyst to Software Developer.

The project applies software development fundamentals to a real-world business scenario, combining object-oriented programming, relational databases, REST APIs, and frontend development.

The application is being developed incrementally, one business module at a time, with an emphasis on understanding, implementing, testing, and improving each feature before expanding the system.

## Project Status

**Current milestone: Client and Vehicle Management**

This is an educational project under active development, not a production-ready application.

### Development Progress

| Milestone                          | Status            |
| ---------------------------------- | ----------------- |
| Client Management                  | ✅ Implemented    |
| Vehicle Management                 | ✅ Implemented    |
| Logical Deactivation (Soft Delete) | ✅ Implemented    |
| Vehicle Rental Management          | 🔜 Next milestone |
| Rental Business Rules              | 📋 Planned        |
| Authentication and Authorization   | 📋 Planned        |
| Automated Testing                  | 📋 Planned        |
| Deployment                         | 📋 Planned        |

The current implementation provides functional client and vehicle management modules, connecting a React frontend to an ASP.NET Core Web API and a SQL Server database.

New features will be introduced progressively as the application evolves.

## Technologies

| Layer             | Technology                                           |
| ----------------- | ---------------------------------------------------- |
| Backend           | C#, .NET 10, ASP.NET Core Web API                    |
| Frontend          | React, JavaScript, JSX, CSS                          |
| Frontend routing  | React Router                                         |
| Frontend tooling  | Vite, npm                                            |
| Database          | Microsoft SQL Server                                 |
| Data access       | ADO.NET, Microsoft.Data.SqlClient                    |
| API documentation | ASP.NET Core OpenAPI, Swagger UI                     |
| Version control   | Git and GitHub                                       |
| Development tools | Visual Studio, VS Code, SQL Server Management Studio |

## Architecture

The solution is organized into three backend projects and one frontend application, separating domain logic, database access, HTTP endpoints, and user interface responsibilities.

```text
EasyRent_2.0/
├── EasyRent.Api/
│   ├── Controllers/
│   │   ├── ClientsController.cs
│   │   └── VehiclesController.cs
│   ├── DTOs/
│   └── Program.cs
│
├── EasyRent.Domain/
│   ├── Entities/
│   │   ├── Client.cs
│   │   └── Vehicle.cs
│   └── Enums/
│       └── CarBody.cs
│
├── EasyRent.Infrastructure/
│   └── Repositories/
│       ├── ClientRepository.cs
│       └── VehicleRepository.cs
│
├── easyrent-web/
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Home.jsx
│       │   ├── ClientManagement.jsx
│       │   └── VehicleManagement.jsx
│       ├── App.jsx
│       ├── App.css
│       └── main.jsx
│
├── EasyRent_2.0.slnx
└── README.md
```

### Backend Responsibilities

**EasyRent.Domain**

Contains domain entities, enumerations, and entity-level business behavior.

**EasyRent.Infrastructure**

Handles database operations using repositories, ADO.NET, and parameterized SQL queries.

**EasyRent.Api**

Exposes REST API endpoints, receives and validates requests, manages dependency injection, and coordinates operations through repositories.

### Frontend Responsibilities

**easyrent-web**

Provides the user interface using React, managing component state, navigation, forms, HTTP requests, and API responses.

### Application Flow

```text
React Frontend
      |
      | HTTP Requests (JSON)
      v
ASP.NET Core Web API
      |
      +-- ClientsController
      |         |
      |    ClientRepository
      |         |
      +-- VehiclesController
                |
           VehicleRepository
                |
           ADO.NET / SQL
                |
                v
        SQL Server Database
```

Both repositories communicate with the same SQL Server database.

## Implemented Features

### Client Management

- Register new clients.
- Display registered clients.
- Search for clients by ID.
- Update client information.
- Deactivate clients with user confirmation.
- Identify rideshare drivers.
- Preserve CPF and CNH during client updates.
- Persist and retrieve client active status.

### Vehicle Management

- Register new vehicles.
- Display registered vehicles.
- Search for vehicles by ID.
- Update vehicle information.
- Deactivate vehicles with user confirmation.
- Manage vehicle model, brand, color, year, and license plate.
- Define daily rental rates.
- Store vehicle availability and active status.
- Classify vehicles using the CarBody enumeration.

Supported vehicle body types:

- Hatchback
- Sedan
- SUV
- Pickup
- Minivan

### Logical Deactivation (Soft Delete)

Instead of permanently deleting clients and vehicles from the database, the application implements a logical deactivation mechanism known as **Soft Delete**.

Each record contains an `IsActive` property that indicates whether it is active in the system.

When a record is deactivated, its `IsActive` property is set to `false`, preserving its database information.

This approach prepares the application for future business relationships and historical rental records.

### Vehicle Status Management

Vehicles contain two independent status properties:

| Property    | Responsibility                                                  |
| ----------- | --------------------------------------------------------------- |
| IsActive    | Indicates whether the vehicle is active in the system           |
| IsAvailable | Indicates whether the vehicle is marked as available for rental |

The separation of these properties prepares the domain model for future rental business rules.

Automatic availability management will be introduced during the development of the rental module.

Currently, inactive records remain retrievable through the API. Status filtering and record reactivation are not yet implemented.

### Validation and Error Handling

- Required-field validation.
- Email format validation.
- Phone number format validation.
- CPF and CNH numeric-format and length validation.
- Vehicle body type validation.
- Vehicle year validation.
- Daily rental rate validation.
- License plate format validation.
- Database uniqueness constraints for email, CPF, CNH, and license plate.
- HTTP 400 responses for invalid requests.
- HTTP 404 responses for missing records.
- HTTP 409 responses for duplicate records.
- Validation feedback displayed in the React interface.

**Current validation limitations:**

CPF and CNH validation checks numeric format and length. Full verification of official check digits is not yet implemented.

License plate validation currently supports the traditional Brazilian format (AAA9999). Mercosur license plate support may be introduced in a future milestone.

### User Interface

- Home page.
- Navigation between application modules.
- Client and vehicle registration forms.
- Registered clients and vehicles tables.
- Search by ID.
- Client and vehicle editing interfaces.
- Confirmation dialogs for record deactivation.
- Responsive layouts using CSS Grid, Flexbox, and media queries.
- Visual feedback for validation errors.
- Consistent styling for forms and action buttons.

## REST API Endpoints

### Client Management

Base route: `/api/clients`

| Method | Endpoint                       | Description             |
| ------ | ------------------------------ | ----------------------- |
| POST   | `/api/clients`                 | Register a client       |
| GET    | `/api/clients`                 | Retrieve all clients    |
| GET    | `/api/clients/{id}`            | Retrieve a client by ID |
| PUT    | `/api/clients/{id}`            | Update a client         |
| PATCH  | `/api/clients/{id}/deactivate` | Deactivate a client     |

### Vehicle Management

Base route: `/api/vehicles`

| Method | Endpoint                        | Description              |
| ------ | ------------------------------- | ------------------------ |
| POST   | `/api/vehicles`                 | Register a vehicle       |
| GET    | `/api/vehicles`                 | Retrieve all vehicles    |
| GET    | `/api/vehicles/{id}`            | Retrieve a vehicle by ID |
| PUT    | `/api/vehicles/{id}`            | Update a vehicle         |
| PATCH  | `/api/vehicles/{id}/deactivate` | Deactivate a vehicle     |

### HTTP Response Status Codes

| Status Code     | Description                                              |
| --------------- | -------------------------------------------------------- |
| 200 OK          | Successful registration, retrieval, or update            |
| 204 No Content  | Successful deactivation                                  |
| 400 Bad Request | Invalid request data                                     |
| 404 Not Found   | Record not found or already inactive during deactivation |
| 409 Conflict    | Duplicate record or uniqueness constraint violation      |

Successful registration returns the generated record ID.

The API uses Data Transfer Objects (DTOs) to separate request and response contracts from domain entities.

Interactive API documentation is available through Swagger UI in the development environment.

## Database

The application uses Microsoft SQL Server with a database named `EASY_RENT_2`.

The current database model contains two main tables: `Client` and `Vehicle`.

### Client Entity

| Property          | Description                                        |
| ----------------- | -------------------------------------------------- |
| Id                | Unique client identifier                           |
| Name              | Client's full name                                 |
| Email             | Unique email address                               |
| Phone             | Contact phone number                               |
| CPF               | Unique Brazilian taxpayer identification number    |
| CNH               | Unique Brazilian driver's license number           |
| IsRideshareDriver | Indicates whether the client is a rideshare driver |
| IsActive          | Indicates whether the client is active             |

### Vehicle Entity

| Property     | Description                              |
| ------------ | ---------------------------------------- |
| Id           | Unique vehicle identifier                |
| Model        | Vehicle model                            |
| Brand        | Vehicle manufacturer                     |
| CarBody      | Vehicle body type represented by an enum |
| Color        | Vehicle color                            |
| CarYear      | Vehicle year                             |
| DailyRate    | Daily rental rate                        |
| LicensePlate | Unique vehicle license plate             |
| IsAvailable  | Vehicle availability status              |
| IsActive     | Vehicle active status                    |

### Data Access

Database operations are implemented using ADO.NET, including:

- SqlConnection
- SqlCommand
- SqlDataReader
- ExecuteScalar
- ExecuteNonQuery
- Parameterized SQL queries

The project intentionally uses direct SQL rather than an Object-Relational Mapper (ORM), allowing deeper practice with relational databases, SQL queries, and data access fundamentals.

## Running the Project Locally

### Prerequisites

- .NET 10 SDK.
- Node.js and npm compatible with the frontend dependencies.
- Microsoft SQL Server.
- Git.
- Visual Studio or another compatible .NET development environment.
- VS Code or another frontend editor.

### 1. Clone the Repository

```bash
git clone https://github.com/paulohenrique3140/EasyRent_2.0.git
cd EasyRent_2.0
```

### 2. Configure the Database

Create a local SQL Server database named `EASY_RENT_2`.

Prepare the `Client` and `Vehicle` tables according to the current entities and database constraints.

Both tables require an identity primary key and an `IsActive` BIT column with a default value of 1.

Configure the `ConnectionStrings:EasyRent` setting to match your local SQL Server instance.

Database credentials should not be committed to version control.

The repository does not currently include a database initialization or migration script, so the database schema must be prepared separately.

### 3. Run the Backend

From the repository root:

```bash
cd EasyRent.Api
dotnet restore
dotnet run --launch-profile https
```

The React application currently expects the API at:

https://localhost:7156

Swagger UI:

https://localhost:7156/swagger/index.html

Verify the active backend URL and local HTTPS development certificate before starting the frontend.

### 4. Run the Frontend

Open another terminal from the repository root:

```bash
cd easyrent-web
npm install
npm run dev
```

Open the application at:

http://localhost:5173

Available frontend routes:

| Route       | Description        |
| ----------- | ------------------ |
| `/`         | Home page          |
| `/clients`  | Client management  |
| `/vehicles` | Vehicle management |

The frontend currently uses local API URLs configured directly in `ClientManagement.jsx` and `VehicleManagement.jsx`.

If the backend runs on a different port, update the corresponding URLs. If the frontend origin changes, update the API's CORS configuration accordingly.

## Development Approach

EasyRent 2.0 is being built incrementally to consolidate software development knowledge before introducing more advanced concepts.

Each development milestone reinforces the complete application flow:

1. User interaction in React.
2. HTTP requests to the ASP.NET Core API.
3. Request validation and DTOs.
4. Domain entities and business behavior.
5. Database operations using ADO.NET.
6. HTTP responses and frontend state updates.

The project also provides practical experience with:

- Object-oriented programming.
- Encapsulation and domain modeling.
- Enumerations.
- Relational databases.
- Repository-based data access.
- REST API development.
- Dependency injection.
- React components and state management.
- Asynchronous HTTP requests.
- Error handling and debugging.
- Git branches, commits, and Pull Requests.

The main goal is not only to deliver working features, but also to develop the ability to analyze requirements, solve problems, evaluate technical decisions, and progressively improve software quality.

## Future Roadmap

### Completed Milestones

- [x] Initial project architecture.
- [x] SQL Server integration.
- [x] Client management backend.
- [x] Client management frontend.
- [x] Vehicle management backend.
- [x] Vehicle management frontend.
- [x] Logical deactivation of clients and vehicles.
- [x] API validation and basic error handling.

### Upcoming Milestones

- [ ] Rental entity and database relationships.
- [ ] Vehicle rental registration.
- [ ] Rental start and end dates.
- [ ] Rental price calculation.
- [ ] Vehicle availability management.
- [ ] Rental history.
- [ ] Rental business rules.
- [ ] Active and inactive record filtering.
- [ ] Record reactivation.
- [ ] Authentication and authorization.
- [ ] Automated unit and integration tests.
- [ ] Database initialization scripts.
- [ ] Improved error handling.
- [ ] Improved configuration management.
- [ ] Application deployment.

### Long-Term Possibilities

- Airline-related services.
- Accommodation-related services.
- Additional integrations and business modules.

The architecture and domain model will evolve as requirements become clearer and new concepts are introduced.

## Current Limitations

This application is intended for learning and local demonstration.

It does not yet include rental transactions, automatic availability management, production authentication, authorization, comprehensive automated testing, database migrations, or deployment configuration.

Sensitive personal data such as CPF and CNH requires appropriate privacy and security controls before the application can be considered for real-world use.

Fictional personal data should be used during development and demonstrations.

## Author

**Paulo Henrique**

Software Developer in training | C# / .NET | SQL Server | React

GitHub: [paulohenrique3140](https://github.com/paulohenrique3140)

---

_EasyRent 2.0 — Learning software development by building, testing, and improving real applications._
