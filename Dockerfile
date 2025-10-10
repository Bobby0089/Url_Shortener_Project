# ==============================
# Build Stage
# ==============================
FROM eclipse-temurin:17-jdk-alpine AS build

# Install Maven, bash, git
RUN apk add --no-cache maven bash git

# Set working directory
WORKDIR /app

# Copy the whole project into the container
COPY . .

# Build the Spring Boot application
RUN mvn -f server/pom.xml clean package -DskipTests

# ==============================
# Runtime Stage
# ==============================
FROM eclipse-temurin:17-jre-alpine

# Set working directory
WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/server/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Java memory options for container
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# JWT Secret environment variable
# You can override this at runtime with docker run -e JWT_SECRET=yourkey
ENV JWT_SECRET="+GO8M3M0FaKU4zpUl9KrOXx+jMgCvB2C6NdHxOZR8JU="

# Run the Spring Boot application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
