# 🏨 Hotel Management System (MERN Stack)  

A **full-fledged Hotel Management System** that provides a **Manager Panel** and an **Admin Panel** for efficiently managing hotel operations. Built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**, this system allows seamless booking, ticket management, package handling, and reporting.
  
---

## 🚀 **Live Demo & Test Credentials**
🔗 **Live Site:** [Hotel Management System](https://hotel-management-xi-eight.vercel.app/)  

### 🏢 **Manager Panel Login**
📧 Email: `peal@gmail.com`  
🔑 Password: `1234`  

### 🔑 **Admin Panel Login**
📧 Email: `admin@gmail.com`  
🔑 Password: `1234`  

---

## 📌 Features

### ✅ **Common Features (Both Admin & Manager Panel)**  
1. **Book Room:**  
   - Filter available rooms by **Deluxe / Non-Deluxe / All types**.  
   - Select booking dates and view available rooms.  
   - Room details include **room number, max capacity, price per night**.  
   - Book a room in a user’s name, accept payments, calculate change.  
   - Generate and print an **invoice** for the user.  

2. **Add Tickets:**  
   - Book hotel facilities such as **Swimming Pool, Paddle Boat, etc.**  
   - Pricing based on **per hour usage**.  
   - Invoice generation for ticket purchases.  

3. **Add Packages:**  
   - Add different **service packages** (e.g., Spa, Gym, Pool access).  
   - Define **package name** and **cost per hour**.  

4. **Add New Rooms:**  
   - Add new rooms with details like:  
     - **Room number**  
     - **Max occupancy**  
     - **Room type (Deluxe/Non-Deluxe)**  
     - **Cost per night**  
     - **Room image**  

5. **Logout:**  
   - Secure logout option for **managers & receptionists**.  

---

### 🔑 **Admin-Only Features**
1. **Add New Manager:**  
   - Create new manager accounts with:  
     - Name  
     - Email  
     - Password & Confirm Password  

2. **Admin Dashboard:**  
   - **Hotel Stats:**  
     - **Total Rooms, Deluxe Rooms, Non-Deluxe Rooms** (Pie Chart)  
   - **Booking Statistics:**  
     - Monthly bookings, room-wise bookings, total bookings (Graphs)  
   - **Ticket Statistics:**  
     - Monthly tickets sold, per ticket sales history  
   - **Earnings Report:**  
     - **Monthly & all-time earnings** from **rooms, tickets, and packages**  
     - **Graphical view of revenue data**  

---

## 🎯 **Tech Stack**
- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Deployment:** Vercel  
- **Authentication:** JSON Web Token (JWT)  

---


## 🛠️ **Installation & Setup**
To run this project locally, follow these steps:  

```bash
# Clone the repository
git clone https://github.com/PealHassan/HotelManagement.git

# Navigate to the project directory
cd HotelManagement

# in client/screens folder all of the backend api call routes should be update. Remove the prefix 'https://hotel-management-server-eight.vercel.app' from the api call url to run the project locally. 

# Install dependencies
npm install  # Install frontend dependencies
cd server && npm install  # Install backend dependencies

# Start the backend server
cd server && npm start  

# Start the frontend
cd client && npm start

```

---

## 📬 **Contact Information**

For any inquiries, feedback, or collaboration opportunities, feel free to reach out:  

👤 **MD. Peal Hassan**  
📧 **Email:** [pealhasan6@gmail.com](mailto:pealhasan6@gmail.com)  
🔗 **LinkedIn:** [Peal Hassan](https://www.linkedin.com/in/pealhassan/)  

💡 If you find this project helpful, consider giving it a ⭐ on GitHub!

