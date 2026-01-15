# Expense Tracker - Full Stack App

This is a full-stack Expense Tracker application built with **React**, **Node.js**, **Express**, and **MongoDB**, containerized using **Docker Compose**.

---

## 📁 Project Structure

├── backend/ # Express backend server <br>
├── frontend/ # React frontend app <br>
└── README.md 


## 🚀 Quick Start

### 1️⃣ Backend Setup

1. Navigate to the backend folder:

```bash
cd backend
```

2. Create a .env.backend file in the root directory with the following content:

```bash
ACCESS_TOKEN_SECRET=access$$$$@@@@------token$$$$@@@@------secret
MONGO_URL=mongodb://mongodb:27017/expensetracker?authSource=admin
```

2️⃣ Frontend Setup

1. Navigate to the frontend folder:

```bash
cd frontend
```

2. Create a .env.frontend file in the root directory with the following content:

```bash
REACT_APP_API_URL=http://localhost:4000/api
```

3. Start the development server using Docker Compose:

```bash
docker compose -f docker-compose.dev.yaml up
```

This command spins up:

* The Express server

* A MongoDB container

🔗 The backend will be available at: http://localhost:4000

📡 API Endpoints:
* Auth: http://localhost:4000/api/user/auth

* Expenses: http://localhost:4000/api/expense

🔗 The frontend will be available at: http://localhost:3000

🧰 Tech Stack

Frontend

* React (TypeScript)
* Redux Toolkit
* Material UI
* Axios

Backend

* Node.js + Express
* MongoDB (via Docker)
* JWT for Authentication
* Joi for validation

DevOps

* Docker
* Docker Compose

💬 Notes

* Make sure Docker is installed and running on your machine.
* The backend and MongoDB are containerized.
* The frontend uses the backend at http://localhost:4000.
* 
