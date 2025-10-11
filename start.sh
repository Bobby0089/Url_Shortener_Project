#!/bin/bash
# Install Java + Maven using apt-get (Debian/Ubuntu based)
apt-get update -y
apt-get install -y openjdk-17-jdk maven

# Move into your Spring Boot project folder
cd Url_Shortener

# Ensure mvnw has execute permission
chmod +x mvnw

# Build your app
./mvnw clean package -DskipTests

# Run the app
java -jar target/*.jar
