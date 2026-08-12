# 🎓 StudentMS — Student Management System

**StudentMS** is a full-stack Student Management System built using the **MERN stack**. It provides a RESTful backend API for user authentication and student management, with a modern React frontend powered by Vite.

The project is designed to provide a foundation for managing student information securely through authenticated API operations.

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected API routes
* Authentication middleware
* User profile endpoint
* Bearer token authorization
* Password hashing with bcrypt

### 👨‍🎓 Student Management

* Add new students
* View all students
* View individual student details
* Update student information
* Delete students
* Duplicate email validation
* MongoDB data persistence

### 🔌 REST API

* RESTful API architecture
* Express.js routing
* Controller-based backend structure
* Protected student endpoints
* JSON request/response format
* HTTP status codes
* MongoDB/Mongoose integration

### 🎨 Frontend

* React 19
* Vite
* React Router
* Axios
* Tailwind CSS
* Lucide React icons
* Modern component-based architecture

---

# 🛠️ Tech Stack

## Frontend

| Technology   | Purpose                         |
| ------------ | ------------------------------- |
| React        | User interface                  |
| Vite         | Development server & build tool |
| React Router | Client-side routing             |
| Axios        | API communication               |
| Tailwind CSS | Styling                         |
| Lucide React | Icons                           |

## Backend

| Technology     | Purpose               |
| -------------- | --------------------- |
| Node.js        | JavaScript runtime    |
| Express.js     | REST API framework    |
| MongoDB        | Database              |
| Mongoose       | MongoDB ODM           |
| JSON Web Token | Authentication        |
| bcrypt         | Password hashing      |
| dotenv         | Environment variables |
| CORS           | Cross-origin requests |

## Deployment

| Service       | Purpose             |
| ------------- | ------------------- |
| Vercel        | Frontend hosting    |
| Render        | Backend/API hosting |
| MongoDB Atlas | Database hosting    |

---

# 📁 Project Structure

```text
StudentMS/
│
├── backend/
│   │
│   ├── controllers/
│   │   ├── studentController.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Student.js
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── studentRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── eslint.config.js
│
├── .gitignore
└── README.md
```

> `node_modules`, `.env`, `.git`, and other generated/local files should not be committed to the repository.

---

# 🚀 Getting Started

Follow the steps below to run **StudentMS** locally.

## Prerequisites

Make sure you have the following installed:

* **Node.js** 18+
* **npm**
* **MongoDB** or a MongoDB Atlas account
* **Git**

Check your installed versions:

```bash
node -v
npm -v
```

---

# 📥 Installation

## 1. Clone the repository

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd StudentMS
```

---

## 2. Install Backend Dependencies

```bash
cd backend
npm install
```

---

## 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend` directory:

```env
PORT=8007
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Example:

```env
PORT=8007
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/StudentMS
JWT_SECRET=your_super_secret_jwt_key
```

> **Never commit your `.env` file to GitHub.**

---

# ▶️ Running the Backend Locally

From the `backend` directory:

```bash
node server.js
```

The backend will run on:

```text
http://localhost:8007
```

The API base URL is:

```text
http://localhost:8007/api
```

---

# ▶️ Running the Frontend Locally

Open a second terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Vite will provide a local development URL, normally:

```text
http://localhost:5173
```

---

# 🔑 Authentication API

The authentication API is available under:

```text
/api
```

## Register

```http
POST /api/register
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Login

```http
POST /api/login
```

### Request

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

A successful login returns a JWT token.

The token should be included when accessing protected endpoints:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## Profile

```http
GET /api/profile
```

Authentication required.

Send the JWT token using:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 👨‍🎓 Student API

Student endpoints are available under:

```text
/api/students
```

Student operations require authentication.

---

## ➕ Add Student

```http
POST /api/students/addStudent
```

### Request

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "CSE",
  "semester": "8"
}
```

---

## 📋 Get All Students

```http
GET /api/students/getStudent
```

Returns all students stored in the database.

---

## 🔎 Get Student by ID

```http
GET /api/students/getStudent/:id
```

Example:

```http
GET /api/students/getStudent/64a123456789
```

---

## ✏️ Update Student

```http
PUT /api/students/getStudent/:id
```

### Request

```json
{
  "name": "John Updated",
  "department": "EEE",
  "semester": "9"
}
```

---

## 🗑️ Delete Student

```http
DELETE /api/students/getStudent/:id
```

Example:

```http
DELETE /api/students/getStudent/64a123456789
```

---

# 🔐 Authentication Flow

The application uses JWT to protect student-related operations.

```text
                    ┌──────────────┐
                    │    Client    │
                    └──────┬───────┘
                           │
                           │ Login
                           ▼
                    ┌──────────────┐
                    │ Auth Route   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │     JWT      │
                    │    Token     │
                    └──────┬───────┘
                           │
                           │ Bearer Token
                           ▼
                    ┌──────────────┐
                    │     Auth     │
                    │  Middleware  │
                    └──────┬───────┘
                           │
                    ┌──────┴───────┐
                    │              │
                 Invalid          Valid
                    │              │
                    ▼              ▼
                 401 Error     Student Route
                                   │
                                   ▼
                               Controller
                                   │
                                   ▼
                                Mongoose
                                   │
                                   ▼
                                MongoDB
```

---

# 🗄️ Database

StudentMS uses **MongoDB** as its database and **Mongoose** as the ODM.

The application currently uses models for:

* Users
* Students

The MongoDB connection is configured through the `MONGO_URI` environment variable.

For production, StudentMS uses **MongoDB Atlas**.

---

# 🧪 API Testing

The backend API can be tested using **Postman** or another API client.

Recommended testing flow:

### Authentication

1. Register a user.
2. Login.
3. Copy the JWT token.
4. Use the token in protected requests.

### Student Management

1. Create a student.
2. Fetch all students.
3. Fetch a specific student.
4. Update a student.
5. Delete a student.

For protected requests, include:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 📊 Current Development Status

## Backend

* [x] Express server
* [x] MongoDB connection
* [x] User model
* [x] Student model
* [x] User registration
* [x] User login
* [x] Password hashing
* [x] JWT authentication
* [x] Authentication middleware
* [x] User profile endpoint
* [x] Create student
* [x] Get all students
* [x] Get individual student
* [x] Update student
* [x] Delete student
* [x] Duplicate student email validation
* [x] REST API structure

## Frontend

* [x] React + Vite setup
* [x] React Router
* [x] Axios
* [x] Tailwind CSS
* [x] Lucide React
* [ ] Production API configuration
* [ ] Production deployment configuration

---

# 🌐 Production Deployment

StudentMS is deployed using the following architecture:

```text
                     ┌─────────────────────────┐
                     │         Vercel           │
                     │                         │
                     │   React + Vite Frontend │
                     └────────────┬────────────┘
                                  │
                                  │ HTTPS
                                  │ REST API
                                  ▼
                     ┌─────────────────────────┐
                     │         Render          │
                     │                         │
                     │  Node.js + Express API  │
                     └────────────┬────────────┘
                                  │
                                  │ Mongoose
                                  ▼
                     ┌─────────────────────────┐
                     │     MongoDB Atlas       │
                     │                         │
                     │        Database         │
                     └─────────────────────────┘
```

### Frontend

The React/Vite frontend is deployed on **Vercel**.

The frontend communicates with the production backend through the Render API URL.

Example:

```text
https://your-backend.onrender.com/api
```

The frontend should **not** use the local development URL in production:

```text
http://localhost:8007/api
```

---

### Backend

The Node.js/Express backend is deployed on **Render**.

The backend requires the following environment variables:

```env
PORT=8007
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

These values should be configured through Render's environment variable settings rather than committed to the repository.

---

### Database

The production database is hosted on **MongoDB Atlas**.

The backend connects to MongoDB Atlas through:

```env
MONGO_URI=your_mongodb_connection_string
```

---

# ⚙️ Production Environment Configuration

## Backend — Render

Configure the following environment variables in Render:

| Variable     | Value                                |
| ------------ | ------------------------------------ |
| `PORT`       | `8007`                               |
| `MONGO_URI`  | Your MongoDB Atlas connection string |
| `JWT_SECRET` | A strong production secret           |

Do not place production credentials directly in source code.

---

## Frontend — Vercel

The frontend must use the deployed Render backend URL instead of the local backend URL.

### Development

```text
http://localhost:8007/api
```

### Production

```text
https://your-backend.onrender.com/api
```

The production API URL should be configured through a frontend environment variable.

Example:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

The frontend can then use the environment variable when making Axios requests.

---

# 🔄 Deployment Flow

The production deployment process is:

```text
Developer
    │
    ▼
GitHub Repository
    │
    ├──────────────────────┐
    │                      │
    ▼                      ▼
 Vercel                  Render
    │                      │
    │ Frontend             │ Backend
    ▼                      ▼
React + Vite          Node + Express
                           │
                           ▼
                    MongoDB Atlas
```

When changes are pushed to the GitHub repository, the connected deployment platforms can build and deploy the updated application.

---

# 🔒 Security

For production deployment:

* Never expose `.env` files publicly.
* Never commit database credentials.
* Never commit JWT secrets.
* Use a strong and unique `JWT_SECRET`.
* Use HTTPS.
* Configure MongoDB Atlas network access appropriately.
* Restrict CORS to the production frontend domain.
* Validate and sanitize user input.
* Store secrets only in deployment environment variables.
* Do not hardcode production API URLs or credentials.
* Keep dependencies updated.

---

# 📌 Environment Variables

## Backend

The backend requires:

| Variable     | Description                     |
| ------------ | ------------------------------- |
| `PORT`       | Port used by the Express server |
| `MONGO_URI`  | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret used to sign JWT tokens  |

Example:

```env
PORT=8007
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_production_jwt_secret
```

## Frontend

The frontend should use:

| Variable       | Description                |
| -------------- | -------------------------- |
| `VITE_API_URL` | Production backend API URL |

Example:

```env
VITE_API_URL=https://your-backend.onrender.com/api
```

> Replace the example Render URL with your actual deployed backend URL.

---

# 📜 Available Scripts

## Frontend

From the `frontend` directory:

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Backend

From the `backend` directory:

```bash
node server.js
```

---

# 🚀 Deployment Checklist

Before deploying StudentMS, make sure:

* [ ] `.env` is included in `.gitignore`
* [ ] No MongoDB credentials are committed
* [ ] No JWT secret is committed
* [ ] Frontend API URL is configurable
* [ ] Backend CORS allows the Vercel frontend
* [ ] MongoDB Atlas database is configured
* [ ] MongoDB Atlas allows the Render backend to connect
* [ ] Backend runs successfully on Render
* [ ] Frontend builds successfully on Vercel
* [ ] Frontend points to the Render API
* [ ] Registration works in production
* [ ] Login works in production
* [ ] JWT authentication works in production
* [ ] Student creation works
* [ ] Student listing works
* [ ] Student update works
* [ ] Student deletion works

---

# 🔮 Future Improvements

The following features can be added as the project continues to grow:

* [ ] Admin and student roles
* [ ] Role-based access control
* [ ] Student search
* [ ] Department filtering
* [ ] Semester filtering
* [ ] Pagination
* [ ] Student profile photos
* [ ] Dashboard statistics
* [ ] Attendance management
* [ ] Marks management
* [ ] Form validation
* [ ] Better error handling
* [ ] Loading states
* [ ] Toast notifications
* [ ] Automated tests
* [ ] API documentation
* [ ] Custom domain
* [ ] CI/CD improvements

---

# 🤝 Contributing

Contributions and improvements are welcome.

### 1. Fork the repository

```bash
git clone <your-repository-url>
```

### 2. Create a feature branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

Implement and test your changes locally.

### 4. Commit your changes

```bash
git add .
git commit -m "Add your feature"
```

### 5. Push your branch

```bash
git push origin feature/your-feature
```

### 6. Open a Pull Request

Create a Pull Request with a clear description of your changes.

---

# 👨‍💻 Author

**Fahim Shahriar Nur**

Computer Science Student
BRAC University

---

# 📄 License

This project is currently intended for **educational and portfolio purposes**.

---

## ⭐ StudentMS

A full-stack student management application built with the MERN stack, with a focus on authentication, REST APIs, database management, and modern web development.

If you find the project useful, consider giving the repository a ⭐.
