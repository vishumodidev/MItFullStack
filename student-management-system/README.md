# 🎓 Student Management System (MERN Stack Project)

A beginner to intermediate level Full Stack Web Application created for 5th Semester Computer Science Engineering students. Built using the MERN Stack (MongoDB, Express.js, React, Node.js) with JWT Authentication.

---

## 📌 Project Overview
The **Student Management System** enables educational administrators to manage student databases digitally. Features include user registration and secure authentication using JSON Web Tokens (JWT), a protected administrative dashboard, full CRUD operations for student records (Create, Read, Update, Delete), and real-time name searching.

---

## 📁 Folder Structure Explanation

```
student-management-system
├── backend                     # Express & Node.js API Server
│   ├── config                  # Database configuration (MongoDB Atlas connection)
│   │   └── db.js
│   ├── controllers             # Handles API request logic and database queries
│   │   ├── authController.js   # User register, login & profile logic
│   │   └── studentController.js# Student CRUD operations logic
│   ├── middleware              # Custom Express middleware
│   │   └── authMiddleware.js   # Protects routes via JWT verification
│   ├── models                  # Mongoose data models & MongoDB schemas
│   │   ├── userModel.js        # User database schema
│   │   └── studentModel.js     # Student database schema
│   ├── routes                  # Express API route definitions
│   │   ├── authRoutes.js       # Authentication routes (/api/auth)
│   │   └── studentRoutes.js    # Student management routes (/api/students)
│   ├── .env.example            # Template for environment configuration
│   ├── package.json            # Node.js dependencies & scripts
│   └── server.js               # Express application entry point
│
└── frontend                    # React 19 Frontend Application (built with Vite)
    ├── src
    │   ├── components          # Reusable UI components
    │   │   ├── Navbar.jsx      # Navigation header bar
    │   │   └── ProtectedRoute.jsx # Authentication guard for protected routes
    │   ├── pages               # Page views
    │   │   ├── Home.jsx        # Landing page
    │   │   ├── Login.jsx       # User login page
    │   │   ├── Register.jsx    # User registration page
    │   │   ├── Dashboard.jsx   # Administrative dashboard
    │   │   ├── Students.jsx    # Student list & search view
    │   │   ├── AddStudent.jsx  # New student registration form
    │   │   └── EditStudent.jsx # Edit student record form
    │   ├── services            # API client configuration
    │   │   └── api.js          # Axios instance with JWT request interceptor
    │   ├── App.jsx             # React Router configuration
    │   ├── index.css           # Global modern CSS styling
    │   └── main.jsx            # React 19 entry point
    ├── index.html              # HTML shell
    ├── package.json            # React dependencies & scripts
    └── vite.config.js          # Vite server and proxy configuration
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
Create a `.env` file inside the `backend` folder and add the following:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/student_db?retryWrites=true&w=majority
JWT_SECRET=mysecretkey12345
```

---

## 🛠️ Installation & Setup Guide

### Prerequisites
- Node.js (v18 or higher installed)
- npm (Node Package Manager)
- MongoDB Atlas Account

### Step 1: Clone or Extract Project
Open your terminal inside the project directory.

### Step 2: Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file as described in the Environment Variables section. Then start the backend server:
```bash
# Development mode with nodemon
npm run dev

# Or standard production mode
npm start
```
The backend server will run at `http://localhost:5000`.

### Step 3: Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```
The React frontend application will run at `http://localhost:3000`.

---

## 🍃 MongoDB Atlas Configuration Guide

### 1. Create an Atlas Account
1. Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and click **Try Free**.
2. Complete sign-up using your email or Google Account.

### 2. Create a Cluster
1. Select the **FREE (M0)** deployment tier.
2. Choose a cloud provider (AWS/Google Cloud) and region closest to your location.
3. Click **Create Cluster**.

### 3. Create a Database User
1. Navigate to **Security** -> **Database Access** in the left sidebar.
2. Click **Add New Database User**.
3. Choose **Password** authentication. Enter a Username and Password (remember these for your connection string).
4. Assign user permissions: **Read and write to any database**. Click **Add User**.

### 4. Whitelist IP Address
1. Navigate to **Security** -> **Network Access**.
2. Click **Add IP Address**.
3. Click **Allow Access from Anywhere** (`0.0.0.0/0`) for easy testing during development.
4. Click **Confirm**.

### 5. Obtain Connection String
1. Navigate to **Database** -> **Overview**.
2. Click **Connect** on your Cluster.
3. Choose **Drivers** (Node.js).
4. Copy the connection string format:
   `mongodb+srv://<username>:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`
5. Replace `<username>` and `<password>` with your database user credentials in `backend/.env`.

---

## 📡 API Endpoints Documentation

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Register a new user (`name`, `email`, `password`) |
| **POST** | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| **GET** | `/api/auth/profile` | Private | Retrieve logged-in user profile |

### Student Management Routes (`/api/students`)
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/students` | Private | Get all students (Supports `?search=name`) |
| **GET** | `/api/students/:id` | Private | Get single student details by ID |
| **POST** | `/api/students` | Private | Add new student (`name`, `email`, `mobile`, `course`, `department`) |
| **PUT** | `/api/students/:id` | Private | Update existing student record |
| **DELETE**| `/api/students/:id` | Private | Delete student record |

---

## 🚀 Deployment Guide

### Deploy Backend on Render (render.com)
1. Push your code repository to GitHub.
2. Sign up / Log in to [render.com](https://render.com).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository and select the repository.
5. Configure web service settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Under **Environment Variables**, add:
   - `PORT`: `5000`
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your secure secret key
7. Click **Create Web Service**. Once deployed, copy your backend URL (e.g., `https://student-api.onrender.com`).

### Deploy Frontend on Netlify (netlify.com)
1. In your frontend codebase (`frontend/src/services/api.js`), ensure production API URL points to your deployed Render URL or configure environment variables.
2. Sign up / Log in to [netlify.com](https://www.netlify.com).
3. Click **Add new site** -> **Import an existing project**.
4. Connect your GitHub repository.
5. Configure deployment settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
6. Click **Deploy Site**.
7. Create a `_redirects` file in `frontend/public` containing `/* /index.html 200` to support React Router client-side routing.
