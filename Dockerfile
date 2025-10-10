# --------------------
# Build stage
# --------------------
FROM eclipse-temurin:17-jdk-alpine AS build

# Install Maven, bash, git
RUN apk add --no-cache maven bash git

# Set working directory
WORKDIR /app

# Copy the whole project into the container
COPY . .

# Build the Spring Boot application using Maven
RUN mvn -f server/pom.xml clean package -DskipTests

# --------------------
# Runtime stage
# --------------------
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/server/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Java memory options for container
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Run the Spring Boot application
# Use exec form to avoid shell issues
ENTRYPOINT ["java", "-jar", "app.jar"]
