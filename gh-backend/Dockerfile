# Dockerfile for Spring Boot Backend (JDK 21)
FROM openjdk:21-jdk-slim AS build

WORKDIR /app

# Copy the build files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

# Build the application
RUN ./mvnw clean package -DskipTests

# Use a smaller base image for the final stage
FROM openjdk:21-jdk-slim

WORKDIR /app

# Copy the built JAR file
COPY --from=build /app/target/*.jar app.jar

# Expose the port the app runs on
EXPOSE 8200

# Run the application
CMD ["java", "-jar", "app.jar"]