<div align="center">

# 🌐 AR STORE

### *The Future of Augmented Reality Shopping*

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![H2](https://img.shields.io/badge/H2-Database-4A90D9?style=for-the-badge&logo=databricks&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)
![Stars](https://img.shields.io/github/stars/Sohamdebb/arstore-backend)

---

**AR Store** is a full-stack e-commerce platform for Augmented Reality & Mixed Reality devices with **3D product viewing**, a complete **order management system**, and an **admin dashboard**. Built with Spring Boot backend and React frontend.

[🚀 Quick Start](#-getting-started) • [📡 API Docs](#-api-endpoints) • [🏗️ Architecture](#-architecture) • [🤝 Contributing](#-contributors)

---

</div>

## 🏗️ Architecture

```
ARStore
│
├── 🎨 Frontend (React 18 + Vite 5 + Tailwind CSS)
│   ├── 🔮 3D/AR Model Viewer (Google model-viewer)
│   ├── 🖼️ Product Image Gallery
│   ├── 🛒 Shopping Cart (localStorage)
│   ├── 👤 Authentication (JWT-style tokens)
│   └── 📱 Fully Responsive UI
│
├── ⚙️ Backend (Spring Boot 3.5 + Java 21)
│   ├── 👤 Users — Register, Login, Profile, Roles
│   ├── 📦 Products — CRUD, Search, Filter, Categories
│   └── 🛒 Orders — Create, History, Status Tracking, Revenue Stats
│
└── 💾 Database (H2 in-memory — instant, zero setup)
    ├── users table
    ├── products table
    ├── orders table
    └── order_items table
```

<br>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🖥️ Backend
- **Full REST API** — 18 endpoints (Products + Users + Orders)
- **Order Management** — Create orders, track status, revenue stats
- **Stock Management** — Auto-deduct stock on order placement
- **Tax & Shipping** — 8% tax, free shipping over $500
- **BCrypt Password Hashing**
- **Input Validation** with Jakarta annotations
- **Global Exception Handling**
- **CORS Configuration**
- **Data Seeding** — 12 products, 2 users, 4 demo orders
- **Search & Filter** by keyword, category, brand
- **Soft Delete** for products
- **Role-Based Access** (ADMIN / USER)

</td>
<td width="50%" valign="top">

### 🎨 Frontend
- **3D/AR Product Viewer** — Interactive 3D models, AR mode on mobile
- **Dark Glassmorphism UI** with smooth animations
- **9 Pages** — Home, Products, Detail, Cart, Login, Register, Profile, Orders, Admin
- **Admin Dashboard** — Product CRUD, order management, revenue stats
- **Order History** — Status timeline, expandable order details
- **Shopping Cart** — Quantity management, real-time totals
- **Advanced Search** — Category filters, price range, sort
- **User Authentication** with localStorage persistence
- **Responsive Design** — works on all devices
- **Loading Skeletons** for better UX
- **Toast Notifications** for user feedback

</td>
</tr>
</table>

<br>

## 🛍️ Product Categories

| Category | Products | Price Range | Description |
|:---------|:--------:|:-----------:|:------------|
| 📱 Smartphones | 2 | $1,199 - $1,299 | iPhone 15 Pro Max, Galaxy S24 Ultra |
| 🥽 AR/VR Headsets | 5 | $499 - $3,500 | Meta Quest 3, Vision Pro, HoloLens 2, PS VR2, Magic Leap 2 |
| 👓 AR Glasses | 1 | $379 | Xreal Air AR Glasses |
| 📷 Cameras | 1 | $349 | Intel RealSense D455 |
| 🎮 Input Devices | 1 | $249 | Ultraleap Leap Motion Controller 2 |
| 🧰 Accessories | 1 | $39 | AR Markers Case |
| 💻 Development Kits | 1 | $1,399 | Qualcomm Snapdragon XR2 Dev Kit |

<br>

## 🗂️ Tech Stack

| Layer | Technology | Purpose |
|:------|:-----------|:--------|
| 🎨 Frontend | React 18, Vite 5, Tailwind CSS 3 | UI, Build, Styling |
| 🔮 3D/AR | Google model-viewer | Interactive 3D models + AR |
| 🧭 Routing | React Router v6 | Client-side navigation |
| 🔔 Notifications | React Hot Toast | User feedback |
| 🎨 Icons | Lucide React | Consistent icon system |
| ⚙️ Backend | Spring Boot 3.5, Java 21 | REST API server |
| 🗄️ ORM | Spring Data JPA / Hibernate | Database operations |
| 🔐 Security | Spring Security, BCrypt | Auth & password hashing |
| 💾 Database | H2 (default) / MySQL (production) | Data persistence |
| 📝 Boilerplate | Lombok | Reduce Java verbosity |

<br>

## 📁 Project Structure

```
arstore-backend/
├── 📂 backend/                              # Spring Boot Backend
│   └── src/main/java/com/arstore/backend/
│       ├── 📄 BackendApplication.java       # App entry point
│       ├── 📂 config/
│       │   ├── SecurityConfig.java          # Spring Security
│       │   ├── CorsConfig.java              # CORS settings
│       │   ├── DataSeeder.java              # Seed 12 products + 2 users + 4 orders
│       │   └── GlobalExceptionHandler.java  # Error handling
│       ├── 📂 controller/
│       │   ├── ProductController.java       # /api/products endpoints
│       │   ├── UserController.java          # /api/users endpoints
│       │   └── OrderController.java         # /api/orders endpoints
│       ├── 📂 dto/
│       │   ├── ApiResponse.java             # Generic response wrapper
│       │   ├── AuthRequest.java             # Login DTO
│       │   ├── RegisterRequest.java         # Registration DTO
│       │   ├── ProductRequest.java          # Product CRUD DTO
│       │   └── OrderRequest.java            # Order creation DTO
│       ├── 📂 entity/
│       │   ├── Product.java                 # Product model
│       │   ├── User.java                    # User model
│       │   ├── Order.java                   # Order model
│       │   └── OrderItem.java               # Order item model
│       ├── 📂 repository/
│       │   ├── ProductRepository.java       # Product queries
│       │   ├── UserRepository.java          # User queries
│       │   └── OrderRepository.java         # Order queries + revenue stats
│       └── 📂 service/
│           ├── ProductService.java          # Product business logic
│           ├── UserService.java             # Auth + user logic
│           └── OrderService.java            # Order logic + revenue stats
│
├── 📂 frontend/                             # React + Vite Frontend
│   ├── 📄 index.html                        # Includes model-viewer CDN
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   └── 📂 src/
│       ├── 📄 main.jsx                      # React entry point
│       ├── 📄 App.jsx                       # Router + layout (9 routes)
│       ├── 📄 index.css                     # Global styles + animations
│       ├── 📂 components/
│       │   ├── Navbar.jsx                   # Responsive nav + search + admin badge
│       │   ├── Footer.jsx                   # Footer with links
│       │   ├── ProductCard.jsx              # Product card with add-to-cart
│       │   └── ThreeDViewer.jsx             # 3D/AR model viewer component
│       ├── 📂 context/
│       │   ├── AuthContext.jsx              # Auth state management
│       │   └── CartContext.jsx              # Cart state management
│       ├── 📂 pages/
│       │   ├── HomePage.jsx                 # Landing page with hero + featured
│       │   ├── ProductsPage.jsx             # Product catalog with filters
│       │   ├── ProductDetailPage.jsx        # Product detail + 3D viewer tabs
│       │   ├── CartPage.jsx                 # Shopping cart + checkout
│       │   ├── LoginPage.jsx                # User login
│       │   ├── RegisterPage.jsx             # User registration
│       │   ├── ProfilePage.jsx              # User profile + quick actions
│       │   ├── OrderHistoryPage.jsx         # Order history with status timeline
│       │   └── AdminDashboard.jsx           # Admin panel (products + orders)
│       └── 📂 services/
│           └── api.js                       # API client (all endpoints)
│
└── 📄 README.md
```

<br>

## 🌐 Live Deployment

Deploy your AR Store to make it accessible to everyone via a public link.

### Option 1: Vercel (Frontend) + Render (Backend) — Recommended

**Step 1: Deploy Backend to Render**
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo → Select `backend` folder
4. Settings:
   - Build Command: `./mvnw clean compile`
   - Start Command: `./mvnw spring-boot:run`
   - Java version: `21`
5. Click **Deploy** → Copy the URL (e.g., `https://arstore-api.onrender.com`)

**Step 2: Deploy Frontend to Vercel**
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import your GitHub repo → Select `frontend` folder
3. Add Environment Variable:
   - Name: `VITE_API_URL`
   - Value: `https://arstore-api.onrender.com` (your Render URL)
4. Click **Deploy** → You get a public URL like `https://arstore.vercel.app`

**Step 3: Share the link!**
Anyone can now access your AR Store at the Vercel URL.

### Option 2: Railway (Full-Stack)
1. Go to [railway.app](https://railway.app)
2. Deploy backend first → Add MySQL plugin
3. Deploy frontend → Set `VITE_API_URL` to backend URL

> 💡 **Free tier available** on all platforms. No credit card needed!

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Install |
|:------------|:-------:|:--------|
| Java | 21+ | [Download](https://adoptium.net/) |
| Node.js | 18+ | [Download](https://nodejs.org/) |

> 💡 **No MySQL needed!** The app uses H2 in-memory database by default.

### 1️⃣ Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

🟢 Backend starts at → `http://localhost:8080`

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

🟢 Frontend starts at → `http://localhost:5173`

### 3️⃣ Demo Accounts

| Role | Email | Password | Access |
|:-----|:------|:---------|:-------|
| 👑 Admin | `admin@arstore.com` | `admin123` | All pages + Admin Dashboard |
| 👤 User | `demo@arstore.com` | `demo123` | All pages except Admin |

> 💡 Use the one-click demo buttons on the login page!

<br>

## 📡 API Endpoints

### Products (9 endpoints)

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `GET` | `/api/products` | Get all active products | ❌ |
| `GET` | `/api/products/{id}` | Get product by ID | ❌ |
| `POST` | `/api/products` | Create new product | ❌ |
| `PUT` | `/api/products/{id}` | Update product | ❌ |
| `DELETE` | `/api/products/{id}` | Soft delete product | ❌ |
| `GET` | `/api/products/search?keyword=` | Search products | ❌ |
| `GET` | `/api/products/category/{cat}` | Filter by category | ❌ |
| `GET` | `/api/products/categories` | Get all categories | ❌ |
| `GET` | `/api/products/brands` | Get all brands | ❌ |

### Users (5 endpoints)

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/users/register` | Register new user | ❌ |
| `POST` | `/api/users/login` | Login & get token | ❌ |
| `GET` | `/api/users/me` | Get current user | ✅ Bearer |
| `GET` | `/api/users/{id}` | Get user by ID | ❌ |
| `PUT` | `/api/users/{id}` | Update user | ❌ |

### Orders (4 endpoints)

| Method | Endpoint | Description | Auth |
|:------:|:---------|:------------|:----:|
| `POST` | `/api/orders` | Create order (deducts stock, calculates tax) | ✅ Bearer |
| `GET` | `/api/orders` | Get current user's orders | ✅ Bearer |
| `GET` | `/api/orders/admin/all` | Get all orders | ❌ |
| `PUT` | `/api/orders/admin/{id}/status` | Update order status | ❌ |
| `GET` | `/api/orders/admin/stats` | Revenue & order statistics | ❌ |

### Order Status Flow

```
PENDING → CONFIRMED → SHIPPED → DELIVERED
    └────→ CANCELLED
```

### Request/Response Examples

<details>
<summary><b>POST /api/orders — Create Order</b></summary>

```json
// Request
{
  "shippingAddress": "123 Tech Street, Silicon Valley, CA",
  "paymentMethod": "Credit Card",
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 3, "quantity": 2 }
  ]
}

// Response
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "id": 1,
    "orderNumber": "AR-100001",
    "status": "CONFIRMED",
    "totalAmount": 1397.97,
    "shippingAddress": "123 Tech Street, Silicon Valley, CA",
    "paymentMethod": "Credit Card",
    "items": [
      {
        "product": { "productName": "Apple iPhone 15 Pro Max" },
        "quantity": 1,
        "price": 1199.99,
        "subtotal": 1199.99
      },
      {
        "product": { "productName": "Meta Quest 3 VR Headset" },
        "quantity": 2,
        "price": 499.99,
        "subtotal": 999.98
      }
    ]
  }
}
```
</details>

<details>
<summary><b>GET /api/orders/admin/stats — Revenue Statistics</b></summary>

```json
{
  "success": true,
  "message": "Stats fetched",
  "data": {
    "totalRevenue": 9914.92,
    "totalOrders": 4,
    "monthlyRevenue": 9914.92,
    "ordersByStatus": {
      "DELIVERED": 1,
      "SHIPPED": 1,
      "CONFIRMED": 1,
      "PENDING": 1
    }
  }
}
```
</details>

<br>

## 🎨 Pages

| Page | Route | Description |
|:-----|:------|:------------|
| 🏠 Home | `/` | Hero section, featured products, features |
| 🛍️ Products | `/products` | Full catalog with search, filter, sort |
| 🔮 Product Detail | `/products/:id` | Image + 3D viewer tabs, add to cart |
| 🛒 Cart | `/cart` | Cart items, quantity controls, checkout |
| 🔐 Login | `/login` | Email/password with demo buttons |
| 📝 Register | `/register` | Full registration with validation |
| 👤 Profile | `/profile` | User info, quick actions, admin link |
| 📋 Orders | `/orders` | Order history with status timeline |
| 📊 Admin | `/admin` | Product CRUD + order management + stats |

<br>

## 🧪 Testing

```bash
# Get all products
curl http://localhost:8080/api/products

# Search products
curl "http://localhost:8080/api/products/search?keyword=apple"

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@arstore.com","password":"demo123"}'

# Create order (replace TOKEN)
curl -X POST http://localhost:8080/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN" \
  -d '{"shippingAddress":"123 Main St","paymentMethod":"Credit Card","items":[{"productId":1,"quantity":1}]}'

# Get order stats (admin)
curl http://localhost:8080/api/orders/admin/stats
```

<br>

## 📈 Key Metrics

<table>
<tr>
<td align="center">
<h3>21</h3>
<p><b>Java Files</b></p>
</td>
<td align="center">
<h3>17</h3>
<p><b>React Files</b></p>
</td>
<td align="center">
<h3>18</h3>
<p><b>API Endpoints</b></p>
</td>
<td align="center">
<h3>9</h3>
<p><b>Pages</b></p>
</td>
<td align="center">
<h3>12</h3>
<p><b>Seed Products</b></p>
</td>
<td align="center">
<h3>4</h3>
<p><b>Seed Orders</b></p>
</td>
</tr>
</table>

<br>

## 🤝 Contributors

<table>
<tr>
<td align="center">
<a href="https://github.com/officialarghya29">
<img src="https://avatars.githubusercontent.com/u/262861107" width="100px;" alt=""/>
<br />
<sub><b>Arghya</b></sub>
</a>
<br />
<sub>🔧 Backend Developer</sub>
<br />
<code>Spring Boot • Java • MySQL</code>
<br />
<code>JPA • REST API • Security</code>
</td>
<td align="center">
<a href="https://github.com/Sohamdebb">
<img src="https://avatars.githubusercontent.com/u/268531911" width="100px;" alt=""/>
<br />
<sub><b>Soham Deb</b></sub>
</a>
<br />
<sub>🎨 Frontend Developer</sub>
<br />
<code>React • Vite • Tailwind CSS</code>
<br />
<code>UI/UX • 3D/AR • State Management</code>
</td>
</tr>
</table>

<table>
<tr>
<td><b>Role</b></td>
<td><b>Arghya (@officialarghya29)</b></td>
<td><b>Soham Deb (@Sohamdebb)</b></td>
</tr>
<tr>
<td>🔧 Responsibility</td>
<td>Backend Architecture & API Design</td>
<td>Frontend Development, UI/UX & 3D/AR</td>
</tr>
<tr>
<td>📁 Files</td>
<td>21 Java files (entities, controllers, services, config, DTOs)</td>
<td>17 React files (components, pages, contexts, services)</td>
</tr>
<tr>
<td>🛠️ Tech</td>
<td>Spring Boot, JPA, H2/MySQL, Spring Security, Lombok</td>
<td>React, Vite, Tailwind CSS, model-viewer, Lucide Icons</td>
</tr>
<tr>
<td>✨ Key Features</td>
<td>REST API, Auth, Orders, Stock mgmt, Revenue stats, Data seeding</td>
<td>3D/AR viewer, Admin dashboard, Order history, Cart, Responsive UI</td>
</tr>
</table>

<br>

## 📝 License

This project is licensed under the MIT License.

<br>

<div align="center">

---

**Built with ❤️ by [Arghya](https://github.com/officialarghya29) & [Soham](https://github.com/Sohamdebb)**

*⭐ Star this repo if you found it helpful!*

</div>
