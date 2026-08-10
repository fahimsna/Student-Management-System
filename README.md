# 🎓 Student Management System

A full-stack **Student Management System** built with the **MERN stack**. The system provides secure user authentication and complete student CRUD operations through a RESTful backend API, with a React frontend being developed to consume these APIs.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* User registration
* User login
* JWT-based authentication
* Protected API routes
* Authentication middleware
* User profile endpoint
* Bearer token authorization

### 👨‍🎓 Student Management

* Add a new student
* View all students
* View a single student
* Update student information
* Delete a student
* Duplicate email validation
* MongoDB data persistence

### 🔌 API

* RESTful API architecture
* Express.js routing
* Controller-based structure
* Protected student endpoints
* JSON request/response format
* HTTP status codes for success and errors

---

## 🛠️ Technologies Used

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* dotenv
* Nodemon

### Frontend

* React.js
* Vite
* Axios
* React Router

### Development Tools

* VS Code
* Postman
* MongoDB
* Git & GitHub

---

## 📁 Project Structure

```text
Student Management System/
│
├── backend/
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
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    ├── package.json
    └── ...
```

---

# 🔑 Authentication API

Base URL:

```text
http://localhost:8007/api
```

### Register User

```http
POST /register
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "1234"
}
```

### Login User

```http
POST /login
```

The login endpoint returns a JWT token.

Example:

```json
{
  "email": "john@example.com",
  "password": "1234"
}
```

Use the returned token for protected endpoints:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Get Profile

```http
GET /profile
```

Authentication required.

---

# 👨‍🎓 Student API

Base URL:

```text
http://localhost:8007/api/students
```

All student endpoints require a valid JWT token.

---

## ➕ Create Student

```http
POST /addStudent
```

Example request:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "department": "CSE",
  "semester": "8"
}
```

Successful response:

```json
{
  "status": 1,
  "message": "Student Added",
  "result": {}
}
```

---

## 📋 Get All Students

```http
GET /getStudent
```

Returns all students stored in MongoDB.

Example response:

```json
{
  "status": 1,
  "message": "Successfully fetched all Students",
  "students": []
}
```

---

## 🔎 Get Single Student

```http
GET /getStudent/:id
```

Example:

```http
GET /api/students/getStudent/6a7941aa48dc78eaa8aafe9a
```

Returns information about a specific student.

---

## ✏️ Update Student

```http
PUT /getStudent/:id
```

Example:

```http
PUT /api/students/getStudent/6a7941aa48dc78eaa8aafe9a
```

Example request:

```json
{
  "name": "John Updated",
  "department": "EEE",
  "semester": "9"
}
```

The updated student is returned in the response.

---

## 🗑️ Delete Student

```http
DELETE /getStudent/:id
```

Example:

```http
DELETE /api/students/getStudent/6a7941aa48dc78eaa8aafe9a
```

Successful response:

```json
{
  "status": 1,
  "message": "Student deleted",
  "result": {}
}
```

---

# 🔐 Protected API Flow

Student operations are protected using JWT authentication:

```text
Client
  │
  ▼
Request + JWT Token
  │
  ▼
authMiddleware
  │
  ├── Invalid Token ──► 401 Unauthorized
  │
  ▼
Student Route
  │
  ▼
Student Controller
  │
  ▼
Mongoose
  │
  ▼
MongoDB
```

---

# 🧪 API Testing

The backend APIs have been tested using **Postman**.

Tested operations include:

* User registration
* User login
* JWT authentication
* Student creation
* Fetching all students
* Fetching a single student
* Updating a student
* Deleting a student

---

# 📌 Current Development Status

### Backend

* [x] User registration
* [x] User login
* [x] JWT authentication
* [x] Authentication middleware
* [x] Student model
* [x] Create student
* [x] Read all students
* [x] Read single student
* [x] Update student
* [x] Delete student
* [x] Postman API testing

### Frontend

* [x] React + Vite project setup
* [ ] Authentication UI
* [ ] Login page
* [ ] Register page
* [ ] Dashboard
* [ ] Student list
* [ ] Add student form
* [ ] Edit student form
* [ ] Delete student UI
* [ ] API integration

---

# 🎯 Future Improvements

* Responsive dashboard
* Search students
* Filter students by department
* Pagination
* Form validation
* Loading states
* Error notifications
* Role-based authorization
* Deployment

---

## 👨‍💻 Author

**Fahim Shahriar Nur**

Computer Science Student
BRAC University

---

⭐ If you find this project useful, consider giving it a star!
