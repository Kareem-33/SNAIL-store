
# 🛒 E-Commerce Web App

An end-to-end full-stack e-commerce platform built with **React**, **Vite**, **Tailwind CSS**, **Node.js**, **Express**, and **MongoDB**. It features full authentication, shopping cart functionality, coupon system, analytics, and admin dashboard — all beautifully styled and mobile responsive.

---

## 🌟 Features

### 👥 Authentication
- Signup / Login with secure JWT cookies
- Role-based access control (Admin vs Customer)

### 🛍️ Shop Features
- Browse all products and filter by category
- Add/remove items to/from cart
- Quantity adjustments with stock control
- Coupon code support for discounts
- Checkout and order creation

### 🧾 Admin Dashboard
- Add/Edit/Delete products
- Toggle featured status
- Manage coupons
- View detailed analytics (sales, revenue, users)

### 📈 Analytics
- Total users, products, sales & revenue
- Daily sales/revenue chart (last 7 days)

---

## ⚙️ Tech Stack

### Frontend
- React + Vite
- Tailwind CSS + Framer Motion
- Zustand (state management)
- Axios

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Auth
- Cloudinary (image upload)

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/e-commerce.git
cd e-commerce

# Install backend dependencies
cd backend
npm install

# Setup environment variables
cp .env.example .env
# fill in your MONGO_URI, JWT_SECRET, CLOUDINARY credentials

# Start backend
npm run dev

# Install frontend dependencies
cd ../frontend
npm install

# Start frontend
npm run dev
```

---

## 📁 Project Structure

```bash
E-Commerce/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── main.jsx, App.jsx
```

---

## 🧪 Environment Variables (`.env`)
```env
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## 📜 License

MIT License — feel free to use and modify!

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.
