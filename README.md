# 📒 Contacts 

A simple **Contacts  API** built with **React**,**Next.js**, **Node.js**, **Express**, and **PostgreSQL** to manage a contacts database.

## Features
✅ Add, edit, delete, and retrieve contacts  
✅ PostgreSQL database integration  
✅ RESTful API endpoints  
✅ Local and cloud deployment setup  

---

##  Getting Started

### **1️⃣ Clone the Repository**

git clone https://github.com/HariharanR1899/Contacts.git
cd backend

### **2️⃣ Install Dependencies**

npm install

### **3️⃣ Setup Environment Variables**

Create a **`.env`** file in the backend directory and add:
```sh
PORT=5001
DB_USER=your_user
DB_PASSWORD=your_Password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=Contacts_DB

```

### **4️⃣ Start the PostgreSQL Database**

Ensure **PostgreSQL** is running locally.  
Create a new database: createdb Contacts_DB

```
CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address TEXT,
      phone VARCHAR(20) NOT NULL
    );
```

### **5️⃣ Run the Backend**

npm start

##  Frontend Setup

Navigate to the **frontend** directory: cd ..frontend

### **1️⃣ Install Dependencies**

npm install

### **2️⃣ Run the Frontend**

npm run dev

---

### **🖥️ Desktop View**
![Desktop View](https://github.com/HariharanR1899/Contacts/blob/main/ScreenRecording2025-02-04at09.43.12-ezgif.com-video-to-gif-converter.gif?raw=true)



### **📱 Mobile View**
![Mobile View](https://github.com/HariharanR1899/Contacts/blob/main/ScreenRecording2025-02-04at11.53.25-ezgif.com-video-to-gif-converter.gif?raw=true)
   
---
## ☁️ Deployment Guide

### ** Cloud Platform: AWS (EC2 & RDS)**

### **1️⃣ Deploy Backend on AWS EC2**

1. Launch an **Ubuntu EC2** instance.
2. SSH into the instance:ssh -i your-key.pem ubuntu@your-ec2-ip
3. Install **Node.js** and **PostgreSQL**:sudo apt update && sudo apt install -y nodejs npm postgresql
4. Clone the repository and install dependencies:git clone https://github.com/HariharanR1899/Contacts.git
cd backend
npm install

### **2️⃣ Setup PostgreSQL on AWS RDS**

1. Go to **AWS RDS** and create a **PostgreSQL** instance.
2. Copy the **database URL** and update `.env`:
   ```
   DB_USER=your_rds_user
   DB_HOST=your_rds_endpoint
   DB_NAME=contacts_db
   DB_PASSWORD=your_rds_password
   DB_PORT=5432
   PORT=5001
   ```

### **3️⃣ Run the Backend**

npm start

### **4️⃣ Set Up a Process Manager (PM2)**

To keep the backend running:
npm install -g pm2
pm2 start server.js –name contacts-api
pm2 save
pm2 startup

---

## 📝 API Endpoints

| Method | Endpoint       | Description              |
|--------|--------------|--------------------------|
| GET    | `/contacts`   | Get all contacts        |
| POST   | `/contacts`   | Add a new contact       |
| GET    | `/contacts/:id` | Get a specific contact  |
| PUT    | `/contacts/:id` | Update a contact       |
| DELETE | `/contacts/:id` | Delete a contact       |

---














