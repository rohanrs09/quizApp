# Quiz Application

<div align="center">
  <h2 align="center">Quiz Application</h2>
  <p align="center">
    A full-stack quiz application with dynamic question fetching and user interaction.
  </p>
  <br />
  <div>
    <img src="https://img.shields.io/badge/-Node.js-black?style=for-the-badge&logoColor=white&logo=node.js&color=339933" alt="nodejs" />
    <img src="https://img.shields.io/badge/-Express-black?style=for-the-badge&logoColor=white&logo=express&color=000000" alt="express" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=47A248" alt="mongodb" />
    <img src="https://img.shields.io/badge/-React-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwind-css&color=06B6D4" alt="tailwindcss" />
  </div>
</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [API Endpoints](#api-endpoints)
6. 🔗 [Environment Variables](#environment-variables)

## 🤖 Introduction

This Quiz Application is a full-stack project that allows users to take quizzes with questions fetched from an external API. The application stores these questions in a MongoDB database and serves them to users one at a time. Users can select their answers, and the application processes their responses in real-time.

## ⚙️ Tech Stack

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React.js, Tailwind CSS
- **External API**: Open Trivia Database

## 🔋 Features

- **Dynamic Question Fetching**: Retrieves 100 questions from the Open Trivia Database API.
- **Database Storage**: Stores fetched questions in a MongoDB database for efficient retrieval.
- **Interactive Quiz Interface**: Presents questions one at a time with multiple-choice options.
- **Real-time Feedback**: Provides immediate feedback on user answers.
- **Score Tracking**: Keeps track of the user's score throughout the quiz.
- **Responsive Design**: Ensures a seamless experience across various device sizes.

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine:

### Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Cloning the Repository

```bash
git clone https://github.com/your-username/quiz-application.git
cd quiz-application
```

### Project Folder Structure

```bash
quiz-app/
├── backend/
│   ├── models/
│   │   └── Question.js
│   ├── routes/
│   │   └── questions.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.js
    │   ├── index.css
    │   └── index.js
    ├── package.json
    └── tailwind.config.js
  ```

### Install backend dependencies
```bash
cd backend
npm install
```

### Install frontend dependencies
```bash
cd ../frontend
npm install
```

# Set Up Environment Variables

Create a `.env` file in the backend directory and add the following:

```plaintext
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

# Running the Project

1. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
2. In a new terminal, start the frontend development server:
    ```bash
   cd frontend
   npm start
   ```
3. Open http://localhost:3000 in your browser to view the application.



# 🕸️ API Endpoints

* `POST /api/questions/fetch-and-store`: Fetches questions from the Open Trivia Database API and stores them in MongoDB.
* `GET /api/questions/random`: Retrieves a random question from the database.



# 🔗 Environment Variables

The following environment variables are required for the application to function properly:

```plaintext
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
Ensure these are set in your .env file in the backend directory before running the application.


### Explanation:
1. The README includes **basic sections** that explain the purpose, technology stack, features, setup instructions, API endpoints, and environment variables.
2. **Code blocks** are used to format instructions like cloning the repository, installing dependencies, and running the application.
3. **Instructions are clear** and broken down step-by-step for users to follow easily.

This format is user-friendly, guiding others on how to use and set up your project. Let me know if this is what you were looking for!
