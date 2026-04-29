# H2O-Flow Web App — Testing & Development Skill

## Overview
H2O-Flow is a React + Node.js ERP web app for water distribution. The frontend uses React + Vite + TypeScript, and the backend uses Node.js + Express + MongoDB with JWT auth.

## Prerequisites
- Node.js 18+
- MongoDB 7.0+ (must be installed and running)

## Environment Setup

### 1. Install MongoDB (if not present)
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor
echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] http://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update -qq && sudo apt-get install -y -qq mongodb-org
sudo systemctl start mongod
```

### 2. Install Dependencies
```bash
cd /home/ubuntu/repos/h2o-flow
npm run install:all
```

### 3. Configure Environment
```bash
cp server/.env.example server/.env
# Default config works for local MongoDB
```

### 4. Start Servers
```bash
# Backend (port 5000)
cd server && node src/index.js &

# Frontend (port 5173)
cd client && npm run dev &
```

### 5. Verify
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok","service":"H2O-Flow API","version":"1.0.0"}
```

## Testing the Auth Flow

### Pages
- Login: `http://localhost:5173/login`
- Register: `http://localhost:5173/register`
- Dashboard: `http://localhost:5173/dashboard` (protected)

### Key Test Scenarios
1. **Registration**: Fill name, email, password, confirm password → redirects to /dashboard with "Account created successfully!" toast
2. **Login**: Enter registered credentials → redirects to /dashboard with "Welcome back!" toast
3. **Invalid login**: Wrong password → stays on /login with "Invalid email or password" toast
4. **Password mismatch**: Different passwords in register form → "Passwords do not match" toast, stays on /register
5. **Protected route**: Access /dashboard without auth → auto-redirects to /login
6. **Logout**: Click logout icon (top-right arrow) → clears token, redirects to /login
7. **Password toggle**: Click eye icon next to password field → reveals/hides password text

### Client-side Validation (Register.tsx)
- Empty required fields: toast "Please fill in all required fields"
- Password mismatch: toast "Passwords do not match"
- Short password (<6 chars): toast "Password must be at least 6 characters"

### Server-side Validation (auth.js)
- Duplicate email: 400 "User already exists with this email"
- Invalid credentials: 401 "Invalid email or password"
- Nepal phone format: must match `^(\+977)?[0-9]{10}$`

### Dashboard Content to Verify
- Greeting: "Welcome, {firstName}!"
- Avatar: first letter of name, uppercase
- Role: displayed as "customer" (default)
- Stats: Water Quality 99.7%, Active Deliveries 24, Subscribers 1,247, Revenue NPR 87,450
- Orders: 4 items (#H2O-2847 through #H2O-2850)
- Sensors: pH 7.2, Turbidity 0.3 NTU, TDS 45 ppm, Temperature 22 C

## Build Verification
```bash
cd client && npx tsc --noEmit && npm run build
```

## Devin Secrets Needed
None — local development uses default MongoDB on localhost with no auth.

## Tips
- Toast notifications auto-dismiss after 3 seconds — take screenshots quickly or increase `duration` in App.tsx Toaster config
- The frontend build output goes to `client/dist/` and can be deployed as static files
- MongoDB must be running before starting the backend server, otherwise it will exit with error
- wmctrl might need to be installed for maximizing browser windows: `sudo apt-get install -y wmctrl`
