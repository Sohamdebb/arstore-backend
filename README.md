<div align="center">

# 🌐 AR STORE

### *The Future of Augmented Reality Shopping*

![Java](https://img.shields.io/badge/Java-21-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

![License](https://img.shields.io/badge/License-MIT-yellow.svg)
![PRs](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)
![Stars](https://img.shields.io/github/stars/Sohamdebb/arstore-backend)
![Forks](https://img.shields.io/github/forks/Sohamdebb/arstore-backend)

---

**AR Store** is a full-stack e-commerce platform for Augmented Reality & Mixed Reality devices. Built with a robust Spring Boot backend and a sleek React frontend, it offers a premium shopping experience for cutting-edge AR/VR technology.

[🚀 Live Demo](#-quick-start) • [📖 API Docs](#-api-endpoints) • [📥 Getting Started](#-getting-started) • [🤝 Contributing](#-contributors)

---

</div>

## 📊 Project Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        🏗️  ARCHITECTURE                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│   ┌──────────────┐      REST API       ┌──────────────────────┐    │
│   │              │ ◄──────────────────► │                      │    │
│   │   REACT      │      /api/*         │   SPRING BOOT        │    │
│   │   FRONTEND   │                     │   BACKEND            │    │
│   │              │                     │                      │    │
│   │  • Vite      │                     │  • JPA / Hibernate   │    │
│   │  • Tailwind  │                     │  • Spring Security   │    │
│   │  • React     │                     │  • MySQL             │    │
│   │    Router    │                     │  • Lombok            │    │
│   │              │                     │  • Validation        │    │
│   └──────────────┘                     └──────────┬───────────┘    │
│         │                                         │                 │
│         ▼                                         ▼                 │
│   ┌──────────────┐                     ┌──────────────────────┐    │
│   │   localhost   │                     │   MySQL Database     │    │
│   │   :5173       │                     │   localhost:3306     │    │
│   └──────────────┘                     └──────────────────────┘    │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

<br>

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

### 🖥️ Backend
- **RESTful API** with full CRUD operations
- **JWT-style Authentication** (Base64 token)
- **BCrypt Password Hashing** for security
- **Input Validation** with Jakarta annotations
- **Global Exception Handling** with clean JSON responses
- **CORS Configuration** for cross-origin requests
- **Data Seeding** with 12 AR/VR products
- **Search & Filter** by keyword, category, brand
- **Soft Delete** for products

</td>
<td width="50%" valign="top">

### 🎨 Frontend
- **Responsive Design** — works on all devices
- **Dark Glassmorphism UI** with smooth animations
- **Product Catalog** with grid view
- **Advanced Search** with category filters & price range
- **Shopping Cart** with quantity management
- **User Authentication** (login/register)
- **User Profile** page with account details
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

<table>
<tr>
<td><strong>Layer</strong></td>
<td><strong>Technology</strong></td>
<td><strong>Purpose</strong></td>
</tr>
<tr>
<td>🎨 Frontend</td>
<td>React 18, Vite 5, Tailwind CSS 3</td>
<td>UI, Build tool, Styling</td>
</tr>
<tr>
<td>🧭 Routing</td>
<td>React Router v6</td>
<td>Client-side navigation</td>
</tr>
<tr>
<td>🔔 Notifications</td>
<td>React Hot Toast</td>
<td>User feedback toasts</td>
</tr>
<tr>
<td>🎨 Icons</td>
<td>Lucide React</td>
<td>Beautiful, consistent icons</td>
</tr>
<tr>
<td>⚙️ Backend</td>
<td>Spring Boot 3.5, Java 21</td>
<td>REST API server</td>
</tr>
<tr>
<td>🗄️ ORM</td>
<td>Spring Data JPA / Hibernate</td>
<td>Database operations</td>
</tr>
<tr>
<td>🔐 Security</td>
<td>Spring Security, BCrypt</td>
<td>Auth & password hashing</td>
</tr>
<tr>
<td>🗃️ Database</td>
<td>MySQL 8</td>
<td>Data persistence</td>
</tr>
<tr>
<td>📝 Boilerplate</td>
<td>Lombok</td>
<td>Reduce Java verbosity</td>
</tr>
</table>

<br>

## 📁 Project Structure

```
arstore-backend/
├── 📂 backend/                          # Spring Boot Backend
│   └── src/main/java/com/arstore/backend/
│       ├── 📄 BackendApplication.java   # App entry point
│       ├── 📂 config/
│       │   ├── SecurityConfig.java      # Spring Security setup
│       │   ├── CorsConfig.java          # CORS configuration
│       │   ├── DataSeeder.java          # Seed 12 products + 2 users
│       │   └── GlobalExceptionHandler.java  # Error handling
│       ├── 📂 controller/
│       │   ├── ProductController.java   # /api/products endpoints
│       │   └── UserController.java      # /api/users endpoints
│       ├── 📂 dto/
│       │   ├── ApiResponse.java         # Generic response wrapper
│       │   ├── AuthRequest.java         # Login DTO
│       │   ├── ProductRequest.java      # Product create/update DTO
│       │   └── RegisterRequest.java     # Registration DTO
│       ├── 📂 entity/
│       │   ├── Product.java             # Product model (13 fields)
│       │   └── User.java                # User model (8 fields)
│       ├── 📂 repository/
│       │   ├── ProductRepository.java   # JPA queries + search
│       │   └── UserRepository.java      # JPA queries + auth
│       └── 📂 service/
│           ├── ProductService.java      # Business logic
│           └── UserService.java         # Auth + user logic
│
├── 📂 frontend/                         # React + Vite Frontend
│   ├── 📄 index.html
│   ├── 📄 package.json
│   ├── 📄 vite.config.js
│   ├── 📄 tailwind.config.js
│   └── 📂 src/
│       ├── 📄 main.jsx                  # React entry point
│       ├── 📄 App.jsx                   # Router + layout
│       ├── 📄 index.css                 # Global styles + animations
│       ├── 📂 components/
│       │   ├── Navbar.jsx               # Responsive nav + search
│       │   ├── Footer.jsx               # Footer with links
│       │   └── ProductCard.jsx          # Reusable product card
│       ├── 📂 context/
│       │   ├── AuthContext.jsx          # Auth state management
│       │   └── CartContext.jsx          # Cart state management
│       ├── 📂 pages/
│       │   ├── HomePage.jsx             # Landing page
│       │   ├── ProductsPage.jsx         # Product catalog
│       │   ├── ProductDetailPage.jsx    # Single product view
│       │   ├── CartPage.jsx             # Shopping cart
│       │   ├── LoginPage.jsx            # User login
│       │   ├── RegisterPage.jsx         # User registration
│       │   └── ProfilePage.jsx          # User profile
│       └── 📂 services/
│           └── api.js                   # API client
│
└── 📄 README.md
```

<br>

## 🚀 Getting Started

### Prerequisites

| Requirement | Version | Install |
|:------------|:-------:|:--------|
| Java | 21+ | [Download](https://adoptium.net/) |
| Node.js | 18+ | [Download](https://nodejs.org/) |
| MySQL | 8+ | [Download](https://dev.mysql.com/) |

### 1️⃣ Database Setup

```sql
CREATE DATABASE arstore;
```

Update `application.properties` with your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/arstore
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

### 2️⃣ Backend Setup

```bash
cd backend
./mvnw spring-boot:run
```

🟢 Backend starts at → `http://localhost:8080`

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

🟢 Frontend starts at → `http://localhost:5173`

### 4️⃣ Demo Accounts

| Role | Email | Password | Description |
|:-----|:------|:---------|:------------|
| 👑 Admin | `admin@arstore.com` | `admin123` | Full admin access |
| 👤 User | `demo@arstore.com` | `demo123` | Standard user |

> 💡 **Tip:** Use the one-click demo buttons on the login page!

<br>

## 📡 API Endpoints

### Products

| Method | Endpoint | Description | Auth Required |
|:------:|:---------|:------------|:-------------:|
| `GET` | `/api/products` | Get all active products | ❌ |
| `GET` | `/api/products/{id}` | Get product by ID | ❌ |
| `POST` | `/api/products` | Create new product | ❌ |
| `PUT` | `/api/products/{id}` | Update product | ❌ |
| `DELETE` | `/api/products/{id}` | Soft delete product | ❌ |
| `GET` | `/api/products/search?keyword=` | Search products | ❌ |
| `GET` | `/api/products/category/{cat}` | Filter by category | ❌ |
| `GET` | `/api/products/categories` | Get all categories | ❌ |
| `GET` | `/api/products/brands` | Get all brands | ❌ |

### Users

| Method | Endpoint | Description | Auth Required |
|:------:|:---------|:------------|:-------------:|
| `POST` | `/api/users/register` | Register new user | ❌ |
| `POST` | `/api/users/login` | Login & get token | ❌ |
| `GET` | `/api/users/me` | Get current user | ✅ Bearer |
| `GET` | `/api/users/{id}` | Get user by ID | ❌ |
| `PUT` | `/api/users/{id}` | Update user profile | ❌ |

### Request/Response Examples

<details>
<summary><b>POST /api/users/register</b></summary>

```json
// Request
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}

// Response
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": 3,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "USER"
    },
    "token": "Mzpqb2huQGV4YW1wbGUuY29tOjU="
  }
}
```
</details>

<details>
<summary><b>GET /api/products</b></summary>

```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": [
    {
      "id": 1,
      "productName": "Apple iPhone 15 Pro Max",
      "description": "The most powerful iPhone ever...",
      "price": 1199.99,
      "imageUrl": "https://images.unsplash.com/...",
      "category": "Smartphones",
      "brand": "Apple",
      "stock": 50,
      "active": true
    }
  ]
}
```
</details>

<br>

## 🎨 UI Screenshots

<table>
<tr>
<td align="center"><b>🏠 Home Page</b></td>
<td align="center"><b>🛍️ Product Catalog</b></td>
<td align="center"><b>🛒 Shopping Cart</b></td>
</tr>
<tr>
<td>
<pre>
┌─────────────────────────────┐
│  🔵 AR Store    🔍    🛒 👤 │
├─────────────────────────────┤
│                             │
│   Experience 🌟             │
│   Augmented Reality         │
│   Products                  │
│                             │
│   [Shop Now]  [Browse AR]   │
│                             │
├─────────────────────────────┤
│  🚚 Free  🛡️ Warranty 🚀 Fast│
├─────────────────────────────┤
│  ⭐ Featured Products        │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐│
│  │📱  │ │🥽  │ │👓  │ │📷  ││
│  │$1.2k│ │$499│ │$379│ │$349││
│  └────┘ └────┘ └────┘ └────┘│
└─────────────────────────────┘
</pre>
</td>
<td>
<pre>
┌─────────────────────────────┐
│  🔵 AR Store    🔍    🛒 👤 │
├─────────────────────────────┤
│  All Products    [Filters]  │
│  📱 Smartphones  🥽 AR/VR   │
│  ─────────────────────────  │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │📱  │ │🥽  │ │👓  │      │
│  │$1.2k│ │$499│ │$379│      │
│  └────┘ └────┘ └────┘      │
│  ┌────┐ ┌────┐ ┌────┐      │
│  │📷  │ │🎮  │ │💻  │      │
│  │$349│ │$249│ │$1.4k│      │
│  └────┘ └────┘ └────┘      │
└─────────────────────────────┘
</pre>
</td>
<td>
<pre>
┌─────────────────────────────┐
│  🔵 AR Store    🔍    🛒 👤 │
├─────────────────────────────┤
│  Shopping Cart              │
│  ┌─────────────────────┐    │
│  │ 📱 iPhone 15 Pro  -1+│    │
│  │              $1,199  │    │
│  └─────────────────────┘    │
│  ┌─────────────────────┐    │
│  │ 🥽 Quest 3       -1+│    │
│  │              $499   │    │
│  └─────────────────────┘    │
│  ─────────────────────────  │
│  Subtotal:    $1,698.98     │
│  Shipping:          FREE    │
│  Tax:            $135.92    │
│  Total:        $1,834.90    │
│  [Proceed to Checkout]      │
└─────────────────────────────┘
</pre>
</td>
</tr>
</table>

<br>

## 🧪 Testing the API

<details>
<summary><b>Test with cURL</b></summary>

```bash
# Get all products
curl http://localhost:8080/api/products

# Search products
curl "http://localhost:8080/api/products/search?keyword=apple"

# Register
curl -X POST http://localhost:8080/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# Login
curl -X POST http://localhost:8080/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@arstore.com","password":"demo123"}'

# Get profile (with token)
curl http://localhost:8080/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

</details>

<br>

## 📈 Key Metrics

<table>
<tr>
<td align="center">
<h3>39</h3>
<p><b>Files Created</b></p>
</td>
<td align="center">
<h3>~3000</h3>
<p><b>Lines of Code</b></p>
</td>
<td align="center">
<h3>12</h3>
<p><b>API Endpoints</b></p>
</td>
<td align="center">
<h3>7</h3>
<p><b>Pages</b></p>
</td>
<td align="center">
<h3>12</h3>
<p><b>Seed Products</b></p>
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
<code>UI/UX • State Management</code>
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
<td>Frontend Development & UI/UX</td>
</tr>
<tr>
<td>📁 Files</td>
<td>14 Java files (entities, controllers, services, config)</td>
<td>25 files (React components, pages, contexts, config)</td>
</tr>
<tr>
<td>🛠️ Tech</td>
<td>Spring Boot, JPA, MySQL, Spring Security, Lombok</td>
<td>React, Vite, Tailwind CSS, React Router, Lucide Icons</td>
</tr>
<tr>
<td>✨ Key Features</td>
<td>REST API, Auth system, Data seeding, Validation, Error handling</td>
<td>Responsive UI, Search/Filter, Cart system, Auth pages, Animations</td>
</tr>
</table>

<br>

## 📝 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<br>

<div align="center">

---

**Built with ❤️ by [Arghya](https://github.com/officialarghya29) & [Soham](https://github.com/Sohamdebb)**

*⭐ Star this repo if you found it helpful!*

![Visitors](https://api.visitorbadge.io/api/visitors?path=Sohamdebb%2Farstore-backend&countColor=%2337d67a&style=flat)

</div>
