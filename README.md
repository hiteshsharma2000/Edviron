# 💳 Payment Gateway Integration with Webhook

This project is a **full-stack MERN application** that integrates with the **Edviron Payment API** to create payment requests, handle transactions, and process **webhook callbacks** from the payment gateway.

---

## 🌐 Live URLs
- **Frontend API**: [https://coddy-app-1.onrender.com](https://coddy-app-1.onrender.com)  
 
- **Backend API**: [https://coddy-app-dl6q.onrender.com](https://coddy-app-dl6q.onrender.com)


- **Frontend Demo Video**: [Watch Demo](https://drive.google.com/file/d/1qG-HwSf1I9A-MDdUZOMWaizKUUW5sd9g/view?usp=sharing)  


> 📌 Replace the demo link with your actual video later.

---

## 🎥 Video Demonstration

You can watch the project demo here:  

[Watch the demo](https://drive.google.com/file/d/1qG-HwSf1I9A-MDdUZOMWaizKUUW5sd9g/view?usp=sharing)

---

## 🚀 Features

- 🔐 JWT Authentication for protected routes  
- 🏫 Create Payment Orders for a specific school  
- 💸 Webhook Integration to update transaction status in MongoDB  
- 📊 Transactions API with pagination, sorting & filtering  
- 🎨 Responsive Frontend built with React + TailwindCSS  
- ⚡ Secure Backend with Express, Mongoose & Axios  

---

## 🛠 Tech Stack

- **Frontend**: React (Vite), TailwindCSS  
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)  
- **Auth**: JWT (jsonwebtoken)  
- **Payment API**: Edviron Dev Environment  

---
## 🛠️ Getting Started

Follow these steps to run the project locally:

### 🔧 Prerequisites
- Node.js & npm
- MongoDB Atlas or local MongoDB server
- Git

### 🚀 Setup Instructions

1. **Clone the repository**

```bash frontend
cd client/sdviron-frontend
npm install
npm run dev

```bash backend
cd server
npm install
npm run dev

```
## Make sure Add .env file in ./server root
### for backend
PORT=
MONGO_URI=
JWT_SECRET=
JWT_EXPIRES_IN=
SCHOOL_ID=
# Payment credentials
PAYMENT_API_KEY=
PAYMENT_PG_KE=

---
### for frontend
VITE_BACKEND_URL

---
## 📦 API Endpoints

### Auth
- `POST /auth/register` → Register user  
- `POST /auth/login` → Login & receive JWT  

### Payments
- `POST /payments/create` → Create payment order (returns payment link)  

### Transactions
- `GET /transactions` → Fetch all transactions (with pagination & sorting)  
- `GET /transactions/school/:schoolId` → Fetch transactions for a specific school  
- `GET /transactions/status/:custom_order_id` → Check status of a transaction  

### Webhook
- `POST /webhook` → Update order status when called by the Payment Gateway  

**Webhook Body Example:**
```json
{
  "order_info": {
    "order_id": "68cb0227154d1bce65b5422f",
    "status": "success",
    "transaction_amount": 500,
    "gateway": "Razorpay",
    "payment_details": {
      "card_type": "VISA",
      "last4": "1234",
      "bank": "HDFC"
    },
    "bank_reference": "BANK123456",
    "payment_message": "Payment completed successfully",
    "error_message": null,
    "payment_time": "2025-09-16T20:10:39.972Z"
  }
}
