# --------------------
# Build Stage
# --------------------
FROM eclipse-temurin:17-jdk-alpine AS build

# Install required tools
RUN apk add --no-cache bash git maven

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for caching dependencies)
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (use Maven Wrapper to ensure version consistency)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src src

# Build Spring Boot app
RUN ./mvnw clean package -DskipTests

# --------------------
# Runtime Stage
# --------------------
FROM eclipse-temurin:17-jre-alpine

# Working directory
WORKDIR /app

# Copy built JAR from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the app port
EXPOSE 8080

# Add environment variables for JWT configuration
ENV JAVA_OPTS="-Xmx512m -Xms256m"
ENV JWT_SECRET="+GO8M3M0FaKU4zpUl9KrOXx+jMgCvB2C6NdHxOZR8JU="
ENV JWT_EXPIRATION_MS="2592000000"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -Dapp.jwt-secret=$JWT_SECRET -Dapp.jwt-expiration-milliseconds=$JWT_EXPIRATION_MS -jar app.jar"]
