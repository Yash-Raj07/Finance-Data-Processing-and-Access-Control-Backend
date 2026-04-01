# Finance Dashboard API Documentation

This API provides backend support for a finance dashboard with User & Role Management, Financial Records Management, and Dashboard Insights.

## Authentication
The API uses JWT-based authentication.
1. **Login**: `POST /api/users/login` with `email` and `id` (acting as a password in this mock).
2. **Authorize**: Include the returned token in the `Authorization` header as `Bearer <token>`.

## Endpoints

### 1. User Management (Admin only)
- `POST /api/users`: Create a new user.
- `GET /api/users`: List all users.
- `PATCH /api/users/:id/status`: Update user active/inactive status.

### 2. Financial Records
- `GET /api/records`: List records with support for:
    - **Pagination**: `?page=1&limit=10`
    - **Filtering**: `?type=income&category=Salary&date=2026-03`
    - **Search**: `?search=grocery` (searches in `note` and `category`)
- `POST /api/records`: Create a record (Analyst/Admin).
- `PUT /api/records/:id`: Update a record (Admin).
- `DELETE /api/records/:id`: Soft delete a record (Admin).

### 3. Dashboard Summary (Analyst/Admin)
- `GET /api/dashboard/summary`: Get aggregated financial data including:
    - Total income/expense
    - Net balance
    - Category-wise totals
    - Recent transactions
    - **Monthly Trends**

## Features
- **Rate Limiting**: 100 requests per 15 minutes per IP.
- **Soft Delete**: Records are marked as `isDeleted: true` and excluded from results.
- **Global Error Handling**: Standardized JSON error responses.

## Testing
Run `npm test` to execute the Jest test suite.
