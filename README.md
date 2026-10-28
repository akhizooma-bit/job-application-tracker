# Job Application Tracker

A MERN-stack web application for organizing job applications, tracking application progress, and managing the job search process.

## Features

- Add and manage job applications.
- Track application status and progress.
- Store company, role, application date, and other job details.
- View, update, search, and filter application records where supported.
- MongoDB database integration through an Express.js REST API.

## Technologies Used

**Frontend**
- React
- Vite
- JavaScript
- CSS

**Backend**
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- REST API

## Project Structure

```text
job-application-tracker/
├── frontend/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── screenshots/
└── README.md
```

## API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/` | Check whether the API is running |
| GET | `/api/applications` | Retrieve applications |
| POST | `/api/applications` | Create an application |
| GET | `/api/applications/:id` | Retrieve an application by ID, if implemented |
| PUT | `/api/applications/:id` | Update an application, if implemented |
| DELETE | `/api/applications/:id` | Delete an application |

**Note:** Confirm each endpoint against `backend/routes/applications.js` before submission. Remove any endpoint that your code does not implement.

## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/akhizooma-bit/job-application-tracker.git
cd job-application-tracker
```

### 2. Configure the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with your test database configuration:

```env
PORT=5000
MONGODB_URI=your_test_mongodb_atlas_connection_string
```

Use a test-only database account and never publish personal or production credentials.

Start the backend:

```bash
node server.js
```

The API will use port 5000 by default.

### 3. Start the frontend

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Screenshots

Add two screenshots of the **working application** to the `screenshots/` folder, then update these image paths to match the actual filenames.

### Application Dashboard

![Job Application Tracker Dashboard](screenshots/dashboard.png)

### Add Application Form

![Add Job Application Form](screenshots/add-application.png)

## Repository

[View the project on GitHub](https://github.com/akhizooma-bit/job-application-tracker)
