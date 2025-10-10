#!/bin/sh

# Build using Maven directly without cd
mvn -f server/pom.xml clean package -DskipTests

# Run the Spring Boot app
java -jar server/target/*.jar
