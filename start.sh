cd server
chmod +x mvnw
./mvnw clean package -DskipTests
mvn clean install
