# GetHealthy

GetHealthy is an information system for managing training programs, workout schedules, exercising, and tracking progress or program engagement. It is designed for all types of sports enthusiasts.

## Account Types

There are three types of accounts in the system:

- **Admin**: Manages users, registration requests, exercises, categories, and exercise metrics.
- **Trainer**: Creates and manages training programs, workout schedule, and monitors trainee progress, program engagement, and popularity.
- **Trainee**: Follows assigned training programs on schedule, browses and joins training programs, provides workout feedback, and tracks exercise progress over time.

## Project Structure

The project consists of the following components:

### Backend

- **REST API**: Implemented using the Java Spring Boot framework.

### Frontend

The frontend includes two separate applications for different user roles:

- **Admin Application**: Allows administrators to manage users, exercises, categories, and other application necessities. It is built using Refine, a React-based open-source framework for enterprise applications.
- **Client Application**: Built using the React library.
  - **Trainee Interface**: Enables trainees to access their training plans, view workout schedules, program details, exercise instructions, provide workout feedback, track exercise progress, and more.
  - **Trainer Interface**: Provides trainers with tools to manage training programs, create their own schedules, monitor trainee progress, program engagement, popularity, and more.

## Running the Application with Docker Compose

To run the application using Docker Compose, follow these steps:

1. Ensure you have [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/) installed on your machine.
2. Navigate to the `deploy` folder in the project directory.
3. Run the following command:

   ```sh
   docker-compose up -d
   ```

   This will start all necessary services in detached mode.

4. To stop the application, run:

   ```sh
   docker-compose down
   ```

For more details on configuring the deployment, check the `docker-compose.yml` file inside the `deploy` folder.

## Screenshots

- **Client application**

![Programs1](https://github.com/user-attachments/assets/3d68b207-1bbc-498b-bc0d-6ab5814c6b32)
![Programs2](https://github.com/user-attachments/assets/f0da0435-0827-4144-bc22-e163c53360a2)
![Exercises2](https://github.com/user-attachments/assets/bf2a659d-1903-406a-b640-adee8f1c0ffa)
![Exercises1](https://github.com/user-attachments/assets/6a2ff1f0-8070-437e-b3aa-890449d8b087)
![Schedule](https://github.com/user-attachments/assets/01475307-fd31-4928-97d1-a3a92ea1bc3b)
![Registration](https://github.com/user-attachments/assets/17d63b18-96bf-4123-8d08-086ef7ef2c41)
![Workout](https://github.com/user-attachments/assets/8fdce0be-32dc-4202-b7fc-14be33472b18)
![Analytics](https://github.com/user-attachments/assets/54cf20b1-b728-496e-a4d6-5832963377cd)
![Profile](https://github.com/user-attachments/assets/d19cbe32-3760-48de-8c6f-cf44465abe59)
![ProgramDetails1](https://github.com/user-attachments/assets/84e6a8f4-dfc2-4388-bd08-24485b4ed239)
![ProgramDetails2](https://github.com/user-attachments/assets/75559d8e-75ce-4439-8b0c-fbc682d1729c)

- **Admin application**

![Admin1](https://github.com/user-attachments/assets/ce12782b-647e-4212-803f-04ba3c06e44e)
![Admin2](https://github.com/user-attachments/assets/bd11d29d-481c-4122-88d3-a2ca29ef1480)
![Admin3](https://github.com/user-attachments/assets/599ea98a-f448-4f1b-accb-0570c96ba73b)
![Admin4](https://github.com/user-attachments/assets/8c49c380-9394-469b-8d9a-a665d94a1cc4)




