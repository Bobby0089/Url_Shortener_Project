# --------------------
# Build stage
# --------------------
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Copy the whole project
COPY . .

# Make mvnw executable
RUN chmod +x server/mvnw

# Build the Spring Boot app
RUN ./server/mvnw -f server/pom.xml clean package -DskipTests

# --------------------
# Runtime stage
# --------------------
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR from build stage
COPY --from=build /app/server/target/*.jar app.jar

# Expose the application port
EXPOSE 8080

# Java memory options
ENV JAVA_OPTS="-Xmx512m -Xms256m"

# Run the Spring Boot app
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
