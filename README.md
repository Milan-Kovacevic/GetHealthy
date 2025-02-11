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

![Programs](https://github.com/user-attachments/assets/52fd7665-0b96-4664-a3cc-15f18c748de6)
![Schedule](https://github.com/user-attachments/assets/0ae835ab-676c-4544-b162-ccef8e5b816b)
![Exercises](https://github.com/user-attachments/assets/56f36ec3-4c3f-436e-9023-fa3ec5435f21)
![Analytics](https://github.com/user-attachments/assets/512c0a3c-c7a9-476a-97b1-959c285a419a)
![Profile](https://github.com/user-attachments/assets/0805daea-3e04-4837-a9a0-d956538ecb94)
![ProgramDetails1](https://github.com/user-attachments/assets/3fb14ba5-234c-4c19-ad09-eb6a1edac141)
![ProgramDetails2](https://github.com/user-attachments/assets/fd1d108a-3997-409c-adc7-4d4487e946f0)

- **Admin application**
  
![Admin1](https://github.com/user-attachments/assets/69334cb1-433c-4ea5-b45f-3ab53660076b)
![Admin2](https://github.com/user-attachments/assets/2f7cb8be-676c-4aa8-baf6-8305ef193c3d)
![Admin3](https://github.com/user-attachments/assets/cb75e600-b4a4-4d29-8686-e6e544479b26)
![Admin4](https://github.com/user-attachments/assets/ae23074f-a05e-419d-9d61-e0fd4cd839b8)





