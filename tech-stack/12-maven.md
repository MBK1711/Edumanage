# 🏗️ Maven — Backend Build Tool

---

## What is it?
Maven is the build automation tool for the Java backend. It manages all backend
dependencies, compiles the code, runs tests, and packages the app into a `.jar` file.

---

## Where is it used?
```
edumanage-backend/
├── pom.xml          ← Project Object Model — lists all dependencies and build config
└── mvnw             ← Maven Wrapper — runs Maven without installing it globally
```

---

## Why Maven?
| Reason | Explanation |
|--------|-------------|
| **Dependency management** | Automatically downloads Spring Boot, JJWT, MySQL Connector, Lombok from Maven Central |
| **Version control** | All dependency versions are declared in one place (`pom.xml`) |
| **Spring Boot integration** | `spring-boot-maven-plugin` packages the app with embedded Tomcat |
| **Maven Wrapper** | `mvnw` / `mvnw.cmd` lets anyone run the project without installing Maven globally |

---

## How it's used in this project

### 1. pom.xml — the heart of the backend build
```xml
<!-- Inherits Spring Boot defaults (versions, plugins) -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.2.3</version>
</parent>

<!-- Java version -->
<properties>
    <java.version>21</java.version>
</properties>
```

### 2. All dependencies declared in pom.xml

| Dependency | What it provides |
|-----------|-----------------|
| `spring-boot-starter-web` | REST API, embedded Tomcat server |
| `spring-boot-starter-data-jpa` | JPA + Hibernate ORM |
| `spring-boot-starter-security` | Authentication & authorization |
| `spring-boot-starter-validation` | `@NotBlank`, `@Email`, `@Size` annotations |
| `spring-boot-devtools` | Auto-restart on code changes during development |
| `mysql-connector-j` | JDBC driver to connect to MySQL |
| `jjwt-api` + `jjwt-impl` + `jjwt-jackson` | JWT token creation and validation |
| `lombok` | Code generation (getters, builders, constructors) |
| `spring-boot-starter-test` | JUnit tests |

### 3. Common Maven commands you'll use
```cmd
:: Run the backend server (starts at localhost:8080)
mvn spring-boot:run

:: Or using the wrapper (no Maven installation required)
mvnw spring-boot:run          ← Linux/Mac
mvnw.cmd spring-boot:run      ← Windows

:: Build a deployable JAR file
mvn clean package

:: Run the JAR directly
java -jar target/edumanage-backend-1.0.0.jar

:: Download all dependencies without building
mvn dependency:resolve

:: Clean compiled files
mvn clean
```

### 4. How Maven resolves dependencies
```
pom.xml declares: spring-boot-starter-web 3.2.3
    → Maven downloads it from Maven Central (internet)
    → Also downloads its transitive dependencies:
        spring-webmvc, spring-context, tomcat-embed-core, jackson-databind, ...
    → Stores them in ~/.m2/repository (local cache)
    → Next time: loads from cache, no internet needed
```

### 5. spring-boot-maven-plugin — packages the app
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
    </plugins>
</build>
```
`mvn package` → creates `target/edumanage-backend-1.0.0.jar` — a self-contained
executable that includes the embedded Tomcat server. Deploy anywhere with just Java.
