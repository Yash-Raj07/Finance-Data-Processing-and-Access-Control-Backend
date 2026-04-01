# Finance Dashboard Backend

## 📌 Overview

This project is a backend system for a finance dashboard that manages users, financial records, and provides summary analytics with role-based access control.

The system is designed with clean architecture principles, separating routes, controllers, services, and middleware. It uses an in-memory data store for simplicity.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* UUID (for unique IDs)
* In-memory storage (no database)

---

## 📁 Project Structure

```
src/
 ├── routes/        # API routes
 ├── controllers/   # Request handlers
 ├── services/      # Business logic
 ├── middleware/    # Auth & RBAC
 ├── models/        # Data schemas (logical)
 ├── store/         # In-memory database
 └── app.js         # Entry point
```

---

## 🧠 Design Approach

This project is structured using a layered architecture:

- Routes → handle API endpoints
- Controllers → manage request/response
- Services → contain business logic
- Store → acts as a data layer

I intentionally separated concerns to keep the system scalable and testable.

RBAC is implemented via middleware to ensure centralized access control rather than scattering permission checks across controllers.


## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-link>
cd finance-dashboard-backend
```

### 2. Install dependencies

```
npm install
```

### 3. Run the server

```
node src/app.js
```

Server will start on:

```
http://localhost:3000
```

---

## 🧪 API Testing

You can test APIs using:

* VS Code REST Client (`test.http`)
* Postman (optional)

---

## 👤 User & Role System

### Roles

* **Viewer**

  * Can only view records

* **Analyst**

  * Can view records
  * Can access dashboard analytics

* **Admin**

  * Full access (create, update, delete, manage users)

---

## 🔐 Authentication (Mock)

This project uses a simple mock authentication system.

Pass user ID in headers:

```
user-id: <user_id>
```

---

## 📊 API Endpoints

### 🔹 Users

#### Create User

```
POST /users
```

#### Get Users

```
GET /users
```

#### Update User Status

```
PATCH /users/:id/status
```

---

### 🔹 Financial Records

#### Create Record

```
POST /records
```

#### Get Records (with filters)

```
GET /records?type=income&category=salary
```

#### Delete Record

```
DELETE /records/:id
```

---

### 🔹 Dashboard

#### Summary

```
GET /dashboard/summary
```

Response:

```
{
  "totalIncome": number,
  "totalExpense": number,
  "netBalance": number
}
```

#### Category-wise Data

```
GET /dashboard/category
```

---

## 🔐 Access Control (RBAC)

| Role    | Permissions                 |
| ------- | --------------------------- |
| Viewer  | Read only                   |
| Analyst | Read + Summary              |
| Admin   | Full CRUD + User Management |

Implemented using middleware that validates permissions before allowing access.

---

## ⚠️ Validation & Error Handling

* Returns proper HTTP status codes:

  * 400 → Bad Request
  * 401 → Unauthorized
  * 403 → Forbidden
  * 500 → Server Error

* Validates:

  * Required fields
  * Invalid operations
  * Missing headers

---

## 💾 Data Persistence

This project uses an **in-memory store**:

* Data resets when server restarts
* Used for simplicity and demonstration purposes

---

## 📌 Assumptions

* Authentication is mocked using headers instead of real JWT
* All data is stored in memory (no persistence layer)
* No pagination implemented due to simplified scope
* Dates are handled as strings

---

## ⚖️ Tradeoffs

* **In-memory DB**

  * ✅ Simple and fast for development
  * ❌ Data not persistent

* **Mock authentication**

  * ✅ Easy to implement
  * ❌ Not secure for production

* **No database indexing**

  * ✅ Less complexity
  * ❌ Not scalable for large data

---



## ✨ Future Improvements

* Add JWT-based authentication
* Add database (MongoDB / PostgreSQL)
* Implement pagination & search
* Add unit tests
* Add API documentation (Swagger)

---

## 🧠 Design Decisions

* Used service layer to separate business logic from controllers
* Used middleware for centralized access control
* Structured project for scalability and maintainability
* Focused on clarity over complexity

---


## ✅ Conclusion

This project demonstrates:

* Clean backend architecture
* Role-based access control
* API design and data flow
* Aggregation logic for dashboards

The implementation focuses on correctness, clarity, and maintainability.
