### 📦 `BatchBox-API.md`

````md
# 📘 BatchBox API Documentation

This document provides detailed information about the BatchBox API endpoints.

> **Base URL:** `http://localhost:5000/api/v1`  
> **Authorization:** Most endpoints are protected and require a JWT Bearer Token:  
> `Authorization: Bearer <your_jwt_token>`

---

# 🔐 1. Authentication & Authorization

Handles institution registration, login, and user profile retrieval.

## 1.1 Register Institution

**Endpoint:** `POST /institution/register`  
**URL:** `http://localhost:5000/api/v1/institution/register`

**Body:**
```json
{
  "institution_name": "Elite Coaching",
  "owner_name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
````

---

## 1.2 Login

**Endpoint:** `POST /auth/login`
**URL:** `http://localhost:5000/api/v1/auth/login`

**Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 1.3 Get User Profile

**Endpoint:** `GET /auth/user`
**URL:** `http://localhost:5000/api/v1/auth/user`
**Authorization:** Bearer token required

---

# 👥 2. People Management

Endpoints for managing users like teachers and students.

## 2.1 Create Person (Teacher/Student)

**Endpoint:** `POST /people`
**URL:** `http://localhost:5000/api/v1/people`
**Authorization:** Bearer token required

**Body:**

```json
{
  "name": "Mr. Rehman",
  "email": "rehman@school.com",
  "password": "password123",
  "phone": "03000000000",
  "role_id": 3
}
```

> `role_id` 3 for Teacher, 4 for Student

---

## 2.2 List People (by Role)

**Endpoint:** `GET /people?role_id=4`
**URL:** `http://localhost:5000/api/v1/people`
**Query Parameters:**

* `role_id` (required): e.g., `4` for students
  **Authorization:** Bearer token required

---

# 🏫 3. Academic Management

Manage academic structures like batches and classes.

## 3.1 Create Batch

**Endpoint:** `POST /batches`
**URL:** `http://localhost:5000/api/v1/batches`
**Authorization:** Bearer token required

**Body:**

```json
{
  "name": "Evening Batch A",
  "description": "Targeted for 9th Grade",
  "start_date": "2025-07-01",
  "end_date": "2025-12-31"
}
```

---

## 3.2 Create Class

**Endpoint:** `POST /classes`
**URL:** `http://localhost:5000/api/v1/classes`
**Authorization:** Bearer token required

**Body:**

```json
{
  "name": "Math Demo Class",
  "date": "2025-07-05",
  "start_time": "10:00 AM",
  "end_time": "11:00 AM",
  "batch_id": 1
}
```

---

# 💰 4. Financial Management

Endpoints related to invoicing.

## 4.1 Create Invoice

**Endpoint:** `POST /invoices`
**URL:** `http://localhost:5000/api/v1/invoices`
**Authorization:** Bearer token required

**Body:**

```json
{
  "student_id": 4,
  "total_amount": 1500,
  "due_date": "2025-07-20",
  "items": [
    {
      "item_type": "package",
      "item_id": 3,
      "label": "12th Commerce Crash Course",
      "amount": 1000
    },
    {
      "item_type": "batch",
      "item_id": 5,
      "label": "Maths - Regular Batch",
      "amount": 500
    }
  ]
}
```

---

# 📦 5. Packages & Bookings

Manage course packages and demo class bookings.

## 5.1 Create Package

**Endpoint:** `POST /packages`
**URL:** `http://localhost:5000/api/v1/packages`
**Authorization:** Bearer token required

**Body:**

```json
{
  "name": "Science Starter Pack",
  "price": 999,
  "duration": 30
}
```

---

## 5.2 Create Booking

**Endpoint:** `POST /bookings`
**URL:** `http://localhost:5000/api/v1/bookings`
**Authorization:** Bearer token required

**Body:**

```json
{
  "name": "John Booking",
  "email": "john@demo.com",
  "phone": "9998887777",
  "package_id": 2,
  "class_id": 1
}
```

---

# 💳 6. Payment Gateway (Stripe)

Integration with Stripe for processing payments.

## 6.1 Create Stripe Checkout Link

**Endpoint:** `POST /payments/create-checkout`
**URL:** `http://localhost:5000/api/v1/payments/create-checkout`
**Authorization:** Bearer token required

**Body:**

```json
{
  "student_id": 4,
  "amount": 1500
}
```

**Response:**

```json
{
  "success": true,
  "url": "https://checkout.stripe.com/pay/..."
}
```

---

## 6.2 Stripe Webhook Handler

**Endpoint:** `POST /payments/stripe/webhook`
**URL:** `https://yourdomain.com/api/v1/payments/stripe/webhook`

> Stripe sends a POST request with payment events. The handler should verify and update payment status.

---

# 💬 7. Communication (Chat)

Internal messaging system.

## 7.1 Send Message

**Endpoint:** `POST /chat`
**URL:** `http://localhost:5000/api/v1/chat`
**Authorization:** Bearer token required

**Body:**

```json
{
  "receiverId": 3,
  "message": "Hello from BatchBox!"
}
```

---

## 7.2 Get All Messages

**Endpoint:** `GET /chat`
**URL:** `http://localhost:5000/api/v1/chat`
**Authorization:** Bearer token required

---

# 🔔 8. Notifications

System for logging and dispatching notifications.

## 8.1 Log Notification (API)

**Endpoint:** `POST /notifications`
**URL:** `http://localhost:5000/api/v1/notifications`
**Authorization:** Bearer token required

**Body:**

```json
{
  "userId": 1,
  "type": "email",
  "message": "Payment Received"
}
```

---

## 8.2 Publish Notification (Internal)

**Function:** `publishNotification`

> Call this in any service to trigger WhatsApp, Email, or System Notification.

**Example:**

```js
import { publishNotification } from '../notifications/publisher';

await publishNotification({
  userId: 1,
  type: "whatsapp",
  message: "Your batch starts tomorrow!"
});
```

---

# 🛠 9. Institution Settings

Manage institution-wide config and public profile.

## 9.1 Update Institution Settings

**Endpoint:** `POST /settings/institution`
**URL:** `http://localhost:5000/api/v1/settings/institution`
**Authorization:** Bearer token required

**Body:**

```json
{
  "name": "BatchBox Coaching",
  "phone": "9999999999",
  "address": "Kolkata, India",
  "logo": "uploads/logo.png"
}
```

---

# ✅ 10. End-to-End Test Flow

Example flow for testing a full registration and notification trigger.

## 10.1 Create an Organization

**Endpoint:** `POST /orgs`
**URL:** `http://localhost:5000/api/v1/orgs`

**Body:**

```json
{
  "name": "Dream Coaching",
  "email": "founder@dream.com",
  "phone": "+918123456789"
}
```

---

## 10.2 Expected Outcome

* 📧 Email with PDF welcome pack sent to `founder@dream.com`
* 💬 WhatsApp welcome message sent to `+918123456789`

---