# ===============================
# Build stage
# ===============================
FROM eclipse-temurin:17-jdk-alpine AS build

# Install Maven, bash, git
RUN apk add --no-cache maven bash git

# Set working directory
WORKDIR /app

# Copy the whole project into the container
COPY . .

# Build the Spring Boot application
RUN mvn clean package -DskipTests

# ===============================
# Runtime stage
# ===============================
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Java memory options for container
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# JWT secret and expiration as environment variables
ENV JWT_SECRET="+GO8M3M0FaKU4zpUl9KrOXx+jMgCvB2C6NdHxOZR8JU="
ENV JWT_EXPIRATION_MS="2592000000"

# Run the Spring Boot application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dapp.jwt-secret=$JWT_SECRET -Dapp.jwt-expiration-milliseconds=$JWT_EXPIRATION_MS -jar app.jar"]
