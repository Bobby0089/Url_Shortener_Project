#!/bin/bash
set -e

echo "🚀 Starting build and deploy process..."

# Use non-interactive mode to avoid apt warnings
export DEBIAN_FRONTEND=noninteractive

echo "📦 Installing OpenJDK 17 and Maven..."
apt-get update -y
apt-get install -y --no-install-recommends openjdk-17-jdk maven

echo "📂 Navigating to project directory..."
cd Url_Shortener

echo "⚙️ Giving mvnw execute permissions..."
chmod +x mvnw || true

echo "🏗️ Building the Spring Boot application..."
./mvnw clean package -DskipTests

echo "🔥 Starting the Spring Boot app in production mode..."
java -jar -Dspring.profiles.active=prod target/*.jar
