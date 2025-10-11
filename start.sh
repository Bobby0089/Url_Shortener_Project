#!/bin/bash
set -e  # Stop script immediately if any command fails

echo "🚀 Starting build and deploy process..."

# ==================================================
# ✅ Install Java and Maven (Debian/Ubuntu-based image)
# ==================================================
echo "📦 Installing OpenJDK 17 and Maven..."
apt-get update -y
apt-get install -y openjdk-17-jdk maven

# ==================================================
# ✅ Navigate to your Spring Boot project folder
# ==================================================
cd Url_Shortener

# ==================================================
# ✅ Ensure mvnw has execute permission
# ==================================================
chmod +x mvnw

# ==================================================
# ✅ Build Spring Boot JAR (skip tests for speed)
# ==================================================
echo "🏗️ Building the Spring Boot application..."
./mvnw clean package -DskipTests

# ==================================================
# ✅ Activate production profile and run the app
# ==================================================
#echo "🔥 Starting the Spring Boot app in production mode..."
#java -jar -Dspring.profiles.active=prod target/*.jar
