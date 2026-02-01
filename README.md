# Project Proposal Management System

A complete monolithic web application for managing Final Course Project Proposals at a university.

## Tech Stack

- **Backend**: Node.js with Express
- **Frontend**: Vue.js 3 with Vue Router
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Architecture**: Monolithic MVC

## Project Structure

```
project_proposal_app/
├── backend/
│   ├── controllers/        # HTTP request handlers
│   ├── services/          # Business logic layer
│   ├── models/            # Database models
│   ├── routes/            # API route definitions
│   ├── middleware/        # Auth & authorization
│   ├── sql/               # Database schema & seed data
│   ├── app.js            # Express app entry point
│   ├── package.json
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/    # Reusable Vue components
    │   ├── views/         # Page components
    │   ├── services/      # API service layer
    │   ├── router/        # Vue Router configuration
    │   ├── App.vue
    │   ├── main.js
    │   └── style.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env.example
```

## Features

### User Roles

1. **PUBLIC** (Unauthenticated)
   - View all proposals
   - View all professors

2. **DOCENTE** (Professor - Authenticated)
   - Login with JWT
   - Create new proposals
   - Edit own proposals
   - Delete own proposals
   - View own proposals

3. **ADMIN** (Administrator - Authenticated)
   - Manage professors (CRUD)
   - Manage students (CRUD)

### Data Entities

- **Docente** (Professor): id, name, email, password
- **Aluno** (Student): id, name, email, student number, assigned proposal
- **Proposta** (Proposal): id, title, description, advisor, co-advisors, keywords
- **PalavraChave** (Keyword): id, keyword text

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE project_proposals;
```

2. Run the schema creation script:
```bash
cd backend
psql -U postgres -d project_proposals -f sql/01_create_tables.sql
```

3. (Optional) Seed with sample data:
```bash
psql -U postgres -d project_proposals -f sql/02_seed_data.sql
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Edit `.env` with your database credentials:
```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=project_proposals
DB_USER=postgres
DB_PASSWORD=PGSQL2026
JWT_SECRET=your-secret-key-change-this

```

5. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional):
```bash
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email and password

### Professors (Docentes)
- `GET /api/docentes` - Get all professors (PUBLIC)
- `GET /api/docentes/:id` - Get professor by ID (PUBLIC)
- `POST /api/docentes` - Create professor (ADMIN)
- `PUT /api/docentes/:id` - Update professor (ADMIN)
- `DELETE /api/docentes/:id` - Delete professor (ADMIN)

### Students (Alunos)
- `GET /api/alunos` - Get all students (ADMIN)
- `GET /api/alunos/:id` - Get student by ID (ADMIN)
- `POST /api/alunos` - Create student (ADMIN)
- `PUT /api/alunos/:id` - Update student (ADMIN)
- `DELETE /api/alunos/:id` - Delete student (ADMIN)

### Proposals (Propostas)
- `GET /api/propostas` - Get all proposals (PUBLIC)
- `GET /api/propostas/my` - Get my proposals (DOCENTE)
- `GET /api/propostas/:id` - Get proposal by ID (PUBLIC)
- `POST /api/propostas` - Create proposal (DOCENTE)
- `PUT /api/propostas/:id` - Update own proposal (DOCENTE)
- `DELETE /api/propostas/:id` - Delete own proposal (DOCENTE)

## Test Credentials

### Professor Account
- **Email**: joao.silva@university.edu
- **Password**: password123
- **Role**: DOCENTE

Note: The seed data includes 4 professors with the same password for testing purposes.

## Architecture Notes

### Backend (MVC Pattern)

- **Models**: Direct database interaction using PostgreSQL node driver
- **Services**: Business logic, validation, and data transformation
- **Controllers**: HTTP request/response handling
- **Routes**: Endpoint definitions with middleware
- **Middleware**: Authentication (JWT) and authorization (role-based)

### Frontend (Vue 3 Composition API)

- **Services**: API communication layer
- **Components**: Reusable UI components
- **Views**: Page-level components
- **Router**: Navigation with route guards for authentication

### Security

- Passwords hashed with bcrypt (10 rounds)
- JWT tokens with 24h expiration
- Role-based access control
- SQL injection prevention via parameterized queries

## Development Commands

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

### Frontend
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Production Deployment

1. Set `NODE_ENV=production` in backend `.env`
2. Change `JWT_SECRET` to a strong random string
3. Update database credentials
4. Build frontend: `npm run build` (creates `dist/` folder)
5. Serve frontend static files with nginx or similar
6. Run backend with process manager (pm2, systemd, etc.)

## Future Enhancements

- Email verification
- Password reset functionality
- File upload for proposal documents
- Search and filter proposals
- Student self-registration
- Proposal approval workflow
- Admin dashboard with statistics

## License

ISC

## Author

Project created for university course assignment.
