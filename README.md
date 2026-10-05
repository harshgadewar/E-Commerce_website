# 🛍️ Velora — Full-Stack E-Commerce Platform

<p align="center">
  <b>A modern full-stack e-commerce platform built from scratch with the MERN stack.</b>
</p>

<p align="center">
  <a href="https://veloraa-o1nc9q7fq-harsh-bdd7.vercel.app/">
    <strong>🌐 Live Demo</strong>
  </a>
  &nbsp; • &nbsp;
  <a href="https://github.com/harshgadewar/E-Commerce_website">
    <strong>💻 GitHub Repository</strong>
  </a>
</p>

---

## 📌 About

**Velora** is a full-stack e-commerce web application built to provide a complete online shopping experience.

The project includes user authentication, product discovery, search and categories, cart management, order processing, online payments, admin product management, image uploads, and a production deployment.

Unlike a simple frontend-only e-commerce UI, Velora includes a complete backend API, database, authentication system, Redis-based token management, payment integration, and deployment infrastructure.

---

## ✨ Features

### 🛒 Customer Features

- Browse products
- Product categories
- Product search
- Product details
- Add products to cart
- Increase/decrease cart quantity
- Remove products from cart
- Stock availability handling
- Buy Now flow
- Checkout
- Order placement
- View previous orders
- User profile
- Login & registration
- Protected user routes

### 🔐 Authentication & Security

- JWT-based authentication
- Access tokens
- Refresh tokens
- HTTP-only cookies
- Redis-backed refresh-token management
- Protected routes
- Admin authorization
- Axios interceptor for automatic token refresh
- Production CORS configuration

### 💳 Payments

- Razorpay payment integration
- Server-side order creation
- Payment signature verification
- Stock validation before payment/order processing
- Order creation after successful payment verification

### 👨‍💼 Admin Panel

- Admin authentication
- Admin dashboard
- Product management
- Add products
- Edit products
- Delete products
- Product stock management
- View orders
- View users
- Dashboard statistics
- Recent orders

### ☁️ Media & Infrastructure

- Cloudinary image uploads
- MongoDB database
- Redis for token/session management
- REST APIs
- Production environment variables
- Frontend deployed on Vercel
- Backend deployed on Render

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Redis
- JWT
- REST API

### Services

- Razorpay — Payment processing
- Cloudinary — Image storage
- Upstash Redis — Hosted Redis
- Vercel — Frontend deployment
- Render — Backend deployment

---

## 🏗️ Architecture

```text
                    ┌──────────────────┐
                    │     Velora       │
                    │     Frontend     │
                    │ React + Vite     │
                    └────────┬─────────┘
                             │
                          Axios
                             │
                             ▼
                    ┌──────────────────┐
                    │     Express      │
                    │   REST API       │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        ┌──────────┐   ┌──────────┐   ┌──────────┐
        │ MongoDB  │   │  Redis   │   │Cloudinary│
        │ Database │   │  Tokens  │   │  Images  │
        └──────────┘   └──────────┘   └──────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Razorpay     │
                    │     Payments     │
                    └──────────────────┘
