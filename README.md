# 💬 Real-Time Chat App

A full-stack real-time chat application that allows users to register, log in, join chat rooms, and communicate with others instantly. Built using **React**, **Node.js**, **Socket.io**, and **MongoDB**.

---

## 🚀 Features

- 🧑‍💻 User registration & login with JWT authentication
- 💬 Real-time messaging using Socket.IO
- 🧠 Chat history (persisted in MongoDB)
- 📡 Typing indicators
- 🧍 Online users tracking
- 🏘️ Dynamic room selection & creation

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios
- Socket.io Client

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT + bcrypt
- CORS, cookie-parser, dotenv

---

## 📁 Project Structure

📦 real-time-chat-app
├── backend/
│ ├── models/
│ ├── routes/
│ ├── socket/
│ ├── .env
│ └── server.js
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── context/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── index.html
│ ├── package.json
│ └── vite.config.js


---

## ⚙️ Environment Variables

Create `.env` files for both frontend and backend.

### `.env` (backend)

PORT=5000
MONGO_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_jwt_secret


### `.env` (frontend)

VITE_BACKEND_URL=http://localhost:5000
VITE_SERVER_URL=http://localhost:5000


## 🧪 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/realtime-chat-app.git
cd realtime-chat-app

2. Install Dependencies
Backend
bash

cd backend
npm install

Frontend

bash
cd frontend
npm install

3. Start the Application
Start Backend

bash
npm run dev   # uses nodemon
Start Frontend

bash
cd frontend
npm run dev