# Jobify - Job Manager

[Jobify](https://jobifymern-wpm8.onrender.com) is a powerful job management tool designed for individuals and teams to **list jobs**, **track progress**, and **manage job-related tasks** efficiently. Whether you're a job seeker or an employer, Jobify helps you stay organized, track your job applications, and manage your career growth.

## 🚀 Features

- **Job Listing**: Post and manage job opportunities.
- **Job Progress Tracker**: Track the status of your job applications and tasks.
- **User Dashboard**: View and manage your job applications and progress in one place.
- **Admin Panel**: For admins to manage job postings and user applications.
- **Responsive Design**: Optimized for both desktop and mobile use.

## 🛠️ Technologies Used

- **Frontend**: React, Vite, Axios, CSS, React Router
- **Backend**: Node.js, Express, MongoDB, JWT Authentication
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary for image and file uploads
- **Utilities**: Day.js for date handling, bcryptjs for password hashing
- **Development Tools**: Nodemon, Concurrently, ESLint, Prettier

## 🌱 How to Run Locally

Follow these steps to set up and run the project on your local machine:

### 1. Clone the Repository

```bash
git clone https://github.com/anmol210202/JobifyMERN.git
cd JobifyMERN
```

### 2. Install Dependencies

Run the following command to install all the necessary dependencies:

```bash
npm run setup-project
```

This command will install dependencies for both the server and the client.

### 3. Start the Development Server

To run both the client and the server locally, use the following command:

```bash
npm run dev
```

This will start the server and the client concurrently. The server will run on
[http://localhost:5100](http://localhost:5100) and the client will run on [http://localhost:5173](http://localhost:5173).

### 4. Environment Variables

Make sure to create a `.env` file in the root directory and add the following variables (or update them based on your project needs):

```bash
NODE_ENV=development   # Set to 'production' for production environment
PORT=5100              # Port for the server to run on
MONGO_URL=<your_mongo_connection_string>  # MongoDB connection URL
JWT_SECRET=<your_jwt_secret>  # Secret key for JWT authentication
JWT_EXPIRES_IN=1d      # JWT token expiration time (e.g., '1d', '1h')
CLOUD_NAME=<your_cloudinary_cloud_name>  # Cloudinary cloud name
CLOUD_API_KEY=<your_cloudinary_api_key>  # Cloudinary API key
CLOUD_API_SECRET=<your_cloudinary_api_secret>  # Cloudinary API secret
```

Make sure to replace the placeholders (`<your_mongo_connection_string>`, `<your_jwt_secret>`, etc.) with your actual values.

### 5. Visit the Application

Open your browser and navigate to [http://localhost:5173](http://localhost:5173) to see the application in action!

## 📜 Scripts

- `npm run setup-project`: Installs all dependencies for both the server and the client.
- `npm run server`: Starts the backend server using `nodemon`.
- `npm run client`: Starts the frontend React app using Vite.
- `npm run dev`: Starts both the backend and frontend concurrently.

## 🤝 Contributing

**Contributions are welcome!** If you want to improve this project, feel free to **fork the repository**, make changes, and **submit a pull request**. Please follow the **contributing guidelines**.

## 💬 Contact

If you have any questions, feel free to reach out to me at [anmol.s20@iiits.in](mailto:anmol.s20@iiits.in).
