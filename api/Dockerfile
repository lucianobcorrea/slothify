FROM maven:3.8.7-eclipse-temurin-17

WORKDIR /app

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src ./src

RUN mvn clean install -DskipTests

ENTRYPOINT ["java", "-jar", "target/tcc-0.0.1-SNAPSHOT.jar"]
