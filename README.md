# 🛒 GlobalMart – Full Stack E-Commerce Web Application

## 📌 Project Description
GlobalMart is a full-stack e-commerce web application that allows users to register, log in, browse products, and manage purchases through a secure authentication system.  
The application is built using React for the frontend and Spring Boot with MySQL for the backend, implementing authentication and role-based access control.

---

## 🚀 Features

- User Registration & Login
- Secure Authentication using Spring Security
- Role-Based Access Control (Admin/User)
- Product Listing & Management
- Add to Cart Functionality
- REST API Integration
- MySQL Database Connectivity

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios
- CSS

### Backend
- Spring Boot
- Spring Security
- Hibernate / JPA
- MySQL
- Maven

---

## 📂 Project Structure

```
globalmart/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── config/
│   └── pom.xml
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/globalmart.git
cd globalmart
```

---

### 2️⃣ Backend Setup

- Open backend project in IntelliJ / STS / Eclipse
- Configure `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/globalmart
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

- Run the application:

```bash
mvn spring-boot:run
```

Backend runs on:
```
http://localhost:8080
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
```
http://localhost:3000
```

---

## 🔐 Authentication Flow

- User registers with username and password
- Password is encrypted using Spring Security
- User logs in using credentials
- Protected routes are secured

---

## 📌 Sample API Endpoints

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | /api/auth/register    | Register new user          |
| POST   | /api/auth/login       | Login user                 |
| GET    | /api/products         | Get all products           |
| POST   | /api/products         | Add product (Admin only)   |

---

## 🎯 Future Enhancements

- Payment Gateway Integration
- Order Management
- Email Notifications
- Search & Filter Products
- Admin Dashboard Analytics

---

## 👨‍💻 Author

Mahesh Peetla  
Full Stack Developer (React + Spring Boot)

---

## 📜 License

This project is developed for educational and learning purposes.
