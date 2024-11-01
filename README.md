# Online Assessment Platform
## Description

Online Assessment Platform  is a web application aimed at helping developers practice coding problems and prepare for technical interviews. The platform provides a wide range of coding problems based on different topics and difficulty levels.
This project is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, making it a full-stack application. 
## Overview
Developed a robust online assessment platform that enables users to practice programming problems and submit their code. This platform was utilized for a college coding event with **500** participants and over **200** active users.

## Disclaimer: This platform requires significant computational resources for real-time code execution, which makes it costly to maintain. Therefore, a hosted link is not provided.
Key Features
User Code Submission: Allows users to submit their code and receive detailed feedback on which test cases their solutions have passed.
Containerized Execution: Engineered a containerized server infrastructure using Docker to execute submitted code securely. This ensures scalability, optimal resource utilization, and enhanced security through sandboxing mechanisms.

## Tech Stack

- Frontend: React.js, HTML, CSS
- Backend: Node.js, Express.js
- Database: MongoDB

## Dockerode and Compilation Flow
## Dockerode
- Dockerode is a Node.js library that allows you to interact with the Docker API programmatically. In this project, Dockerode is utilized to create and manage Docker containers for executing user-submitted code in a secure and isolated environment. This approach ensures that the code execution does not interfere with the main application and provides a robust sandboxing mechanism.

# Compilation Flow
## User Code Submission:

- Users submit their code through the platform's frontend. The code is sent to the backend for processing.
## Initiating Compilation:

- The backend receives the submitted code and uses Dockerode to create a new Docker container. This container is specifically designed for code execution, ensuring a clean environment for each submission.
## Code Transfer to Container:

- The submitted code is sent to the newly created Docker container. Dockerode handles the transfer and sets up the necessary environment within the container.
Execution:

- Once the code is in the container, it is executed. The Docker container runs the code against predefined test cases.
## Result Retrieval:

- After execution, the output generated by the code is collected from the container. Dockerode manages the retrieval of this output, ensuring that it is captured accurately.
Sending Output to Backend:

- The compiled output is sent back to the Node.js backend, where it is processed for evaluation.
## Output Evaluation:

- The backend compares the received output with the expected output for each test case. Based on this comparison, the system generates feedback for the user, indicating which test cases passed and which failed.
## User Feedback:

- Finally, the results are communicated back to the frontend, providing users with immediate feedback on their submissions.
This compilation flow ensures that users can safely test their code in a controlled environment, while also providing a responsive and informative user experience.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/vedang999/oa.git
   ```
   
2. Change to the project directory:

   ```
   cd (##)
   ```

3. Start the server:
   
- Navigate to the `server` directory:
- 
  ```
  cd server
  ```
  
- Install the server dependencies:
  
  ```
  npm install
  ```

- Setup the environment variables:
  - Create a .env file.
  - Add the required environment variables, such as the MongoDB connection string and YouTube API key.
  
- Start the server:
  ```
  node index.js
  ```
  or
  ```
  nodemon start
  ```

4. Run the client:
  
- Navigate to the `leetcode_clone_frontend` directory:
  
  ```
  cd client
  ```
- Install the client dependencies:
  
  ```
  npm install
  ```
  
- Start the client:
  ```
  npm run dev
  ```

The client will be accessible at `http://localhost:3000`. 
