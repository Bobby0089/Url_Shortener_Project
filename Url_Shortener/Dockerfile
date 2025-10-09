# Base image with Java 17
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first for caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (cache layer)
RUN ./mvnw dependency:go-offline -B

# Copy project source
COPY src ./src

# Build the Spring Boot app
RUN ./mvnw package -DskipTests

# Expose port 8080
EXPOSE 8080

# Run the JAR (update name if different)
ENTRYPOINT ["java","-jar","target/UrlShortener-0.0.1-SNAPSHOT.jar"]
