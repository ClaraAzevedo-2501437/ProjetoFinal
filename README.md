# Project Proposal Management System

A web platform where professors create final course project proposals for students to develop. Built with Node.js, Express, Vue.js 3, and PostgreSQL following the MVC architecture pattern.

## Use Cases

### 1. Docente (Professor - Authenticated)
- Authenticate in the system using JWT
- Create new project proposals
- Edit existing proposals
- Delete proposals
- View their own proposals

### 2. Unauthenticated User (Public)
- View list of all professors

### 3. Administrator (Authenticated)
- Manage professors: create, read, update, and delete
- Manage students: create, read, update, and delete

## Setup and Run Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm

### Database Setup

1. Create a PostgreSQL database:
```bash
psql -U postgres
CREATE DATABASE project_proposals;
\q
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

### Environment Configuration

Create a `.env` file in the `backend` directory with the following configuration:

```env
# Environment Configuration
NODE_ENV=development
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=project_proposals
DB_USER=postgres
DB_PASSWORD=PGSQL2026

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production-please-use-a-long-random-string
```

### Backend Setup

1. Navigate to backend directory and install dependencies:
```bash
cd backend
npm install
```

2. Start the backend server:
```bash
npm start
# or for development with auto-reload
npm run dev
```

The backend will run on http://localhost:3000

### Frontend Setup

1. Navigate to frontend directory and install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:5173

## Available Endpoints

### Authentication
- `POST /api/auth/login` - Authenticate user with email and password

### Professors (Docentes)
- `GET /api/docentes` - Get all professors (PUBLIC)
- `GET /api/docentes/:id` - Get professor by ID (PUBLIC)
- `POST /api/docentes` - Create professor (ADMIN only)
- `PUT /api/docentes/:id` - Update professor (ADMIN only)
- `DELETE /api/docentes/:id` - Delete professor (ADMIN only)

### Students (Alunos)
- `GET /api/alunos` - Get all students (ADMIN only)
- `GET /api/alunos/:id` - Get student by ID (ADMIN only)
- `POST /api/alunos` - Create student (ADMIN only)
- `PUT /api/alunos/:id` - Update student (ADMIN only)
- `DELETE /api/alunos/:id` - Delete student (ADMIN only)

### Proposals (Propostas)
- `GET /api/propostas` - Get all proposals (DOCENTE only)
- `GET /api/propostas/my` - Get my proposals (DOCENTE only)
- `GET /api/propostas/:id` - Get proposal by ID (DOCENTE only)
- `POST /api/propostas` - Create proposal (DOCENTE only)
- `PUT /api/propostas/:id` - Update own proposal (DOCENTE only)
- `DELETE /api/propostas/:id` - Delete own proposal (DOCENTE only)

### Health Check
- `GET /health` - Check server status
