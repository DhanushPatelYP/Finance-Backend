# 💰 Finance Data Processing and Access Control Backend

## 📌 Overview

This project is a backend system designed for a finance dashboard where users interact with financial data based on their roles. It demonstrates backend architecture, API design, data modeling, role-based access control, and aggregation-based analytics.


---

## 🚀 Tech Stack

* Node.js– Runtime
* Express.js – Backend framework
* MongoDB (Mongoose) – Database
* JWT (jsonwebtoken) – Authentication
* Postman – API testing
Key Point: I have added postman collection with details to cross check the API and correctness

---

## 🧠 Architecture Overview

The project follows a clean and modular structure:

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middleware/
 ├── config/
 └── app.js

### Key Design Choices:

* Separation of concerns (routes → controllers → models)
* Middleware for authentication and authorization
* MongoDB for flexible financial data modeling
* Aggregation pipelines for analytics

---

## 👥 User Roles & Access Control

### Roles Implemented:

* Admin:
  * Full access (CRUD + user-level control)
* Analyst:
  * Can create and view financial records
* Viewer:
  * Read-only access

### Access Control Strategy:

* JWT-based authentication middleware
* Role-based authorization middleware
* Backend enforces permissions (not frontend)

### Example:

* Viewer cannot create records ❌
* Analyst cannot delete records ❌
* Admin has full access ✅

---

## 🔐 Authentication Flow

1. User registers/logs in
2. Server returns JWT token
3. Token is sent in headers:
   Authorization: Bearer <token>
4. Middleware verifies token and attaches user to request

---

## 📊 Features Implemented

### 1. User Management

* Register and login
* Role assignment (admin / analyst / viewer)
* User status (active/inactive)
* Inactive users restricted from login

---

### 2. Financial Records Management

Each record includes:

* Amount
* Type (income / expense)
* Category
* Date
* Notes

### Supported Operations:

* Create record
* Get records (with filters & pagination)
* Update record (admin only)
* Delete record (admin only)

### Filtering:

* By type (income/expense)
* By category
* Pagination using `page` and `limit`

---

### 3. Dashboard APIs (Aggregation)

#### ✅ Summary API

* Total income
* Total expense
* Net balance

#### ✅ Category-wise Breakdown

* Grouping by category

#### ✅ Monthly Trends

[
  { "month": 4, "type": "income", "total": 13000 },
  { "month": 4, "type": "expense", "total": 3500 }
]

### Design Explanation:

* Used MongoDB aggregation (`$match`, `$group`, `$sum`)
* Avoided heavy application-level loops
* Structured output for frontend/dashboard usage

---

## 🛡️ Access Control Implementation

Implemented using middleware:

* `authenticate` → verifies JWT
* `authorizeRoles` → checks permissions

### Flow:

Request → Authenticate → Authorize → Controller

---

## ⚙️ Validation & Error Handling

### Validation:

* Required fields checked (amount, type, category)
* Type restricted to `income` or `expense`
* Auth validation for protected routes

### Error Handling:

* Proper HTTP status codes:

  * 400 → Bad Request
  * 401 → Unauthorized
  * 403 → Forbidden
  * 404 → Not Found
  * 500 → Server Error

### Example:

{
  "message": "Amount, type, and category are required"
}

---

## 🗄️ Data Modeling

### User Model:

* name
* email
* password (hashed)
* role
* status

### Record Model:

* userId (reference to user)
* amount
* type
* category
* date
* notes

### Design Reasoning:

* `userId` ensures user-specific data isolation
* `type` enables financial calculations
* `category` supports grouping

---

## 🧪 Testing

Tested using Postman with multiple roles:

### Scenarios Tested:

* Admin full access
* Analyst limited access
* Viewer read-only access
* Unauthorized requests blocked
* Invalid inputs handled

---

## ⚙️ Setup Instructions

In terminal:
git clone https://github.com/DhanushPatelYP/Finance-Backend.git
cd project
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key


Run server:

npm run dev


---

## 💡 Assumptions Made

* Each user accesses only their own financial records
* No multi-tenant sharing between users
* Authentication is simplified (no refresh tokens)
* Roles are predefined (admin, analyst, viewer)
* Soft delete not implemented (hard delete used)
* Frontend is not part of scope (API-first design)
* MongoDB chosen for flexibility over relational structure

---

## 🔥 Highlights

* Clean backend architecture
* Role-based access control (RBAC)
* Secure API design using JWT
* Aggregation-based analytics
* Structured and maintainable codebase

---

## 🏁 Conclusion

In this project :

* Backend system design
* Role-based access control
* Data modeling and aggregation
* Clean and maintainable code practices

The focus was on building a logically structured and reliable backend system aligned with real-world usage scenarios.

---Thank You---

Dhanush Patel Y P
dhanushyp0205@gmail.com
