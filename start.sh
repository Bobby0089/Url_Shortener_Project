#!/bin/bash
cd Url_Shortener
./mvnw clean package -DskipTests
java -jar target/*.jar
