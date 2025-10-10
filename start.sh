#!/bin/bash

# Build using Maven directly (no cd)
mvn -f server/pom.xml clean package -DskipTests

# Run the Spring Boot app
java -jar server/target/*.jar
