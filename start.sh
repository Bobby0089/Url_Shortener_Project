# ==================================================
# ✅ SPRING BOOT PRODUCTION CONFIGURATION
# ==================================================

spring.application.name=Url_Shortener

# ==================================================
# ✅ SERVER CONFIGURATION
# ==================================================
server.port=8080
server.servlet.context-path=/urlapp

# ==================================================
# ✅ DATABASE CONFIGURATION (Railway)
# ==================================================
spring.datasource.url=jdbc:mysql://${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}
spring.datasource.username=${MYSQLUSER}
spring.datasource.password=${MYSQLPASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Automatically create and update database tables
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# ==================================================
# ✅ JWT CONFIGURATION
# ==================================================
app.jwt-secret=${JWT_SECRET:+GO8M3M0FaKU4zpUl9KrOXx+jMgCvB2C6NdHxOZR8JU=}
app.jwt-expiration-milliseconds=2592000000

# ==================================================
# ✅ LOGGING CONFIGURATION (Reduced for production)
# ==================================================
logging.level.root=INFO
logging.level.org.springframework.web=INFO
logging.level.org.hibernate.SQL=ERROR
logging.level.org.hibernate.type.descriptor.sql=ERROR
logging.level.com.urlshortener=INFO

# Disable file logging to avoid disk I/O overhead
logging.file.name=

# ==================================================
# ✅ ERROR & SECURITY CONFIGURATION
# ==================================================
server.error.include-stacktrace=never
server.error.whitelabel.enabled=false

# ==================================================
# ✅ PERFORMANCE CONFIGURATION
# ==================================================
server.compression.enabled=true
server.compression.mime-types=application/json,application/xml,text/html,text/xml,text/plain
