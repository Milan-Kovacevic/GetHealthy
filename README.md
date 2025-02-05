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
