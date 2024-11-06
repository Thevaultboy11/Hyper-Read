![Landing Page](/readme_images/landing_page.png)
# Hyper Read (Speed Reading Application)

## Table of Contents
- [About](#about)
- [Core Functionalities](#core-functionalities)
- [Security Features](#security-features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Team Members (Shield Members)](#team-members-shield-members)
- [Contact Information](#contact-information)

---

## About

**Hyper Read** is a speed-reading application designed to help users build a habit of fast and efficient reading. Users can read their own private books or choose from a library of provided titles. To support this goal, the app offers a range of helpful features.

> **PS:** One of the standout aspects of this application is the variety of security principles and safeguards we’ve implemented. These can serve as a useful case study for integrating similar protections into your own projects.

![Reading Page](/readme_images/reading_page.png)
## Core Functionalities

The application offers several key features to help improve reading speed and retention. The experience is gamified with a focus on security. Key features include:

- **Reading Page**: The main feature for speed reading. Books are split into chunks, which load in the background for better performance. Your progress is saved automatically when you finish a page. After 15 minutes of reading, a break timer will appear.

- **Analytics**: To make reading more fun, we added analytics. Users can track their reading stats, like their fastest words per minute (wpm), total reading time, and average wpm over a period. These stats are updated only after using the app for a certain amount of time to prevent manipulation.

- **Library**: A customizable collection of books that every user can access. Users can choose as many books as they like. Books are uploaded by the admin only.

- **Test Functionality**: A feature to test the user's reading speed and help them track improvement.
## Security Features
![Secured By Design](/readme_images/secured_by_design.jpg)


- **Auth**: A strong password policy is enforced, and custom authentication middleware is implemented on both the backend and frontend for better security.
- **Storing User Data**: Only essential user data is stored. Passwords are salted and hashed for maximum security.
- **Authorization (IDOR)**: Three user roles are defined—unlogged, user, and admin. Each role has the minimum functionality needed to operate the application.
- **Rate Limiting**: There are limits on repeated requests to prevent DDoS and brute force attacks.
- **Token Validation**: Parameters are compared against the current session token to prevent unauthorized access.
- **Input Validation**: All inputs are validated both on the frontend and backend, with special care taken for the file upload feature to ensure smooth rendering and security.
- **Least Functionality**: The application follows the principle of least functionality, ensuring users only have access to the features they need.


## Technologies Used

The following technologies were used to develop "Hyper Read":
- **Frontend**: [Next.js, React, MUI, Axios, Chart.js, react-hook-form, react-spring,  next-auth]
- **Backend**: [Node.js, Express, JWT, Axios, multer]
- **Database**: [PostgreSQL]


## Installation

Follow this guide step-by-step to set up the application on your local machine.

### Repository

[GitLab Repository for Csilla Application](https://gitlab.com/hyperide/csilla-application.git)

---

### Table of Contents

1. [Creating the Environment](#creating-the-environment)
2. [Setting Up Environment Variables](#setting-up-environment-variables)
3. [Running the Database](#running-the-database)
4. [Running the Back End](#running-the-back-end)
5. [Running the Front End](#running-the-front-end)

---

### 1. Creating the Environment

#### Prerequisites
Ensure you have the following installed:
- **Docker**
- **Node.js** (version 18)

If Node.js version 18 is not installed:
1. Install **nvm** (Node Version Manager).
2. Run `nvm install 18` to install Node.js version 18.
3. Set the correct version using: 
   ```bash
   nvm use 18
   ```

---

### 2. Setting Up Environment Variables

#### Backend Environment Variables
1. Navigate to the `csillia-api` directory.
2. Create a `.env` file and add the following content:

   ```env
   NODE_ENV=development
   PORT=8080
   ORIGIN="http://localhost:5174" # only set in production, in development defaults to wildcard (*)
   FILE_PATH=[PATH TO LOCAL FOLDER FOR STORING LIBRARY BOOKS]

   JWT_SECRET="zcsHC8BUf7qKtsztYHCL6m2ugqmwavBPKnNSNY4aemqsAZhwvKJeuYzE8wBX8b8mAjwgxK5X3wJnYKejyddXacVTTAWaW8JHf99LSzB6mLH8w4zJFbCpVJ6JNHGJsbzX"

   DB_HOST="localhost"
   DB_PORT=3306
   DB_USERNAME="root"
   DB_NAME="csilliadb"
   DB_PASS="rootpasswordforlocaldev"
   ```

3. Customize any variables if necessary, though we recommend sticking with the default values.

#### Frontend Environment Variables
1. Navigate to the `csilia-frontend` directory.
2. Create a `.env` file and add the following content:

   ```env
   NEXT_PUBLIC_FRONT_END_PATH="http://localhost:5174"
   NEXT_PUBLIC_BACK_END_PATH="http://localhost:8080"
   JWT_SECRET="zcsHC8BUf7qKtsztYHCL6m2ugqmwavBPKnNSNY4aemqsAZhwvKJeuYzE8wBX8b8mAjwgxK5X3wJnYKejyddXacVTTAWaW8JHf99LSzB6mLH8w4zJFbCpVJ6JNHGJsbzX"
   ```

---

### 3. Running the Database

After setting up the necessary environment configurations, follow these steps to set up the database:

1. Run the database container with Docker:
   ```bash
   docker compose up -d
   ```
   
2. Verify that the database is running:
   ```bash
   docker compose ps
   ```

3. Set up the tables and populate the database with default values. We recommend using **Beekeeper** for this step.

   **Beekeeper Credentials:**
   - Database name: `csilliadb`
   - Username: `root`
   - Password: `rootpasswordforlocaldev`

---

### 4. Running the Back End

1. Ensure you are using Node.js version 18:
   ```bash
   node -v
   ```
   If not, switch to version 18 using:
   ```bash
   nvm use 18
   ```

2. Install the required packages:
   ```bash
   npm install --force
   ```

3. Start the backend server:
   ```bash
   npm run dev
   ```

4. If everything is set up correctly, you should see the following message:
   ```plaintext
   [nodemon] starting ts-node -r esm src/bin/server.ts
   Listening on port 8080
   Data Source has been initialized
   ```

---

### 5. Running the Front End

1. First, build the frontend packages:
   ```bash
   npm build --force
   ```

2. Start the frontend server:
   ```bash
   npm run dev
   ```

3. Note: The initial loading of the page may take around 15 seconds due to prerendering in the background.

---
Thank you for setting up the Csilla Application! For any issues, please refer to the [GitLab repository](https://gitlab.com/hyperide/csilla-application.git) for further support.

## Pages

- Home Page (/home)
- Faq (/faq)
- Read Now (/read-now)
- Library (/library)
- Analytics (/analytics)
- Test (/test) NOTE: Works only if you have a library book uploaded as the admin.
- Admin Panel (/admin/uploadbook) NOTE: You have to be logged in as the admin.

## Team Members (Shield Members)

Meet the dedicated team behind "Hyper Read":

- **Captain [Edin Zujo]** - Project Lead
- **Engineer [Dzemal Dzananovic]** - Full Stack Developer & Security Specialist
- **Engineer [Eman Catic]** - BackEnd Developer & Database Architect: A & Security Specialist
- **DevOps [Rijad Gadzo]** -  ensuring smooth integration and continuous delivery (CI/CD)

## Contact Information

For questions, support, or feedback, reach out at:

- **Email**: [thevaultboy11@gmail.com](mailto:thevaultboy11@gmail.com)
- **LinkedIn**: [LinkedIn Profile](https://www.linkedin.com/in/dzemal-dzananovic/)