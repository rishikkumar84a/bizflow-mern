# BizFlow — BDA Team Management System
Module 5: Business Development Associate (BDA) Team Module

## Tech Stack
- Frontend: React 18 + Tailwind CSS + React Query
- Backend: Node.js + Express.js
- Database: MongoDB + Mongoose
- Authentication: JWT + bcrypt
- State Management: Context API
- Charts: Recharts
- Containerization: Docker + docker-compose
- Testing: Jest + Supertest (backend), Vitest + RTL (frontend)
- CI/CD: GitHub Actions

## Features
- Authentication (Register/Login/Logout)
- Role-based access control (Admin, BDA Manager, BDA)
- Lead Pipeline Management (Kanban board with drag-and-drop stage updates)
- Activity Logging (calls, emails, meetings, notes, tasks)
- Team Performance Dashboard (for Admin/Manager)
- Individual BDA Dashboard
- Analytics with charts (Recharts)

## Architecture Diagram
```
┌─────────────┐
│   Frontend  │ (React + Tailwind)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Backend   │ (Express.js)
└──────┬──────┘
       │
       ├──────────────┐
       │              │
       ▼              ▼
┌─────────────┐ ┌─────────┐
│   MongoDB   │ │   JWT   │
└─────────────┘ └─────────┘
```

## Prerequisites
- Node.js 20+
- MongoDB (or Docker)
- npm or yarn

## Environment Variables
Create a `.env` file in the backend directory (see `backend/.env.example`):
```
MONGODB_URI=mongodb://localhost:27017/bizflow
JWT_SECRET=your-secret-key-here
JWT_EXPIRE=7d
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

## Installation & Local Setup
### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker
```bash
docker-compose up
```

## Running Tests
### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## API Documentation
### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Leads
- `GET /api/leads` - Get all leads (with filters)
- `POST /api/leads` - Create new lead
- `GET /api/leads/:id` - Get lead by ID
- `PATCH /api/leads/:id` - Update lead
- `PATCH /api/leads/:id/stage` - Update lead stage
- `DELETE /api/leads/:id` - Delete lead

### Activities
- `GET /api/leads/:id/activities` - Get activities for lead
- `POST /api/leads/:id/activities` - Create activity
- `PATCH /api/activities/:id` - Update activity
- `DELETE /api/activities/:id` - Delete activity

### Analytics
- `GET /api/analytics/team` - Get team analytics (Admin/Manager)
- `GET /api/analytics/bda/:id` - Get BDA analytics
- `GET /api/analytics/pipeline` - Get pipeline analytics

## Frontend Pages
- `/login` - Login/Register page
- `/dashboard` - Role-based dashboard
- `/leads/pipeline` - Kanban board view
- `/leads/:id` - Lead detail page
- `/analytics` - Analytics dashboard (Admin/Manager)

## Folder Structure
```
bizflow-mern/
├── backend/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── leadController.js
│   │   ├── activityController.js
│   │   └── analyticsController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Lead.js
│   │   └── Activity.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── leads.js
│   │   ├── activities.js
│   │   └── analytics.js
│   ├── db/
│   │   └── mongo.js
│   ├── tests/
│   ├── .env.example
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Pipeline.jsx
│   │   │   ├── LeadDetail.jsx
│   │   │   └── Analytics.jsx
│   │   ├── contexts/
│   │   │   └── AuthContext.jsx
│   │   ├── api/
│   │   │   └── axiosConfig.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── Dockerfile
├── .github/workflows/
│   └── ci.yml
├── .gitignore
├── docker-compose.yml
└── README.md
```

