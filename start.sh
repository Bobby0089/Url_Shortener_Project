#!/bin/bash
apk add --no-cache openjdk17 maven
cd Url_Shortener
chmod +x mvnw
./mvnw clean package -DskipTests
java -jar target/*.jar
