# 🛡️ InsuraSphere – Insurance Management Platform

InsuraSphere is a full-stack insurance management platform that allows users to explore insurance products, apply for policies, track application status, and manage insurance workflows. Admins can review applications, approve/reject requests, and manage policy data.

Frontend uses **React.js + Tailwind CSS**, and backend uses **Node.js + Express + LowDB** for lightweight storage.  
The project is fully deployed using **Vercel (Frontend)** and **Render (Backend)**.

---

## 🚀 Live Demo Links

🔗 **Frontend (Vercel):** https://insura-sphere.vercel.app/ 
---

## 📌 Features

### 👤 User (Customer) Features
- Create account & login (JWT authentication)
- Browse insurance products:
  - Life Insurance
  - Health Insurance
  - Auto Insurance
  - Travel Insurance
- Apply for insurance
- Upload required documents
- View application status
- Profile & dashboard

### 🛠️ Admin Features
- Admin login
- Create and manage policy products
- View all applications
- Approve / Reject user requests
- Dashboard metrics

### ⚙️ Technical Features
- Full REST API using Express.js
- CORS enabled for production deployment
- File uploads using Multer
- Password hashing with bcrypt
- JWT authentication & protected routes
- LowDB JSON database for simplified development
- Clean React components with reusable UI design
- Centralized API service file (`api.js`)
- Deployed on cloud hosting (Render + Vercel)

---

## 📂 Project Structure

