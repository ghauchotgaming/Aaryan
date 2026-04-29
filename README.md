# H2O-Flow

**Master ERP & Supply-Chain for Water Distribution**
*Target Market: Biratnagar, Nepal*

A data-driven ecosystem to manage water production, optimize logistics, secure physical assets, and ensure financial transparency.

## Tech Stack

- **Frontend**: React + TypeScript (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT-based with role-based access control

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or cloud)

### Installation

```bash
# Install all dependencies (root, server, client)
npm run install:all

# Create server .env file
cp server/.env.example server/.env
# Edit server/.env with your MongoDB URI and JWT secret

# Start development (both server and client)
npm run dev
```

### Development URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## Features (Phase 1)

- User Registration & Login (Email/Password)
- Role-based access (Customer, Driver, Admin, Manager)
- JWT Authentication with protected routes
- Dashboard with real-time stats overview
- IoT sensor readings display
- Order tracking UI
- Nepal phone number validation
- Water-themed responsive design

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| GET | `/api/health` | Health check |

## Project Structure

```
h2o-flow/
├── client/          # React frontend (Vite + TypeScript)
│   └── src/
│       ├── components/   # Reusable components
│       ├── context/      # React context (Auth)
│       ├── pages/        # Page components
│       ├── services/     # API service layer
│       └── styles/       # Global CSS
├── server/          # Node.js backend (Express)
│   └── src/
│       ├── config/       # DB configuration
│       ├── middleware/    # Auth middleware
│       ├── models/       # Mongoose models
│       └── routes/       # API routes
└── README.md
```

## Roadmap

- **Q3 2026**: AI Route Optimization
- **Q4 2026**: Blockchain Ledger for asset tracking
- **Q1 2027**: IoT Sensor Integration for real-time dashboards
