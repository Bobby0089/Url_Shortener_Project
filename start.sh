#!/bin/bash

# Navigate to server
cd server

# Make mvnw executable
chmod +x mvnw

# Build and run
./mvnw clean package -DskipTests
java -jar target/*.jar
