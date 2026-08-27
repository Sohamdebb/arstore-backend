FROM eclipse-temurin:21-jdk-alpine

WORKDIR /app

# Copy Maven wrapper and pom.xml first for caching
COPY backend/mvnw .
COPY backend/pom.xml .
COPY backend/.mvn .mvn
RUN chmod +x mvnw

# Download dependencies
RUN ./mvnw dependency:go-offline -B 2>/dev/null || true

# Copy source code
COPY backend/src src

# Build
RUN ./mvnw clean package -DskipTests -B

# Run
EXPOSE 8080
CMD ["java", "-jar", "target/backend-0.0.1-SNAPSHOT.jar"]
