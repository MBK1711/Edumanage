# 🌱 Spring Boot — The backend engine

---

## Simple explanation
Spring Boot is like a **ready-made restaurant kitchen.**
Instead of building every appliance from scratch, Spring Boot gives you everything pre-wired:
a web server, database connection, security, validation — all configured automatically.

You just write the **recipe** (your code) and Spring Boot handles the rest.

---

## Where we use it
Everything inside `edumanage-backend/` is a Spring Boot app:
```
src/main/java/com/edumanage/backend/
├── controller/   ← The "menu" — lists all API endpoints (URLs)
├── service/      ← The "kitchen" — where the actual logic happens
├── repository/   ← The "waiter to the database" — fetches/saves data
├── entity/       ← The "dish templates" — defines what's in the database
├── security/     ← The "security guard" — checks who is allowed in
└── config/       ← The "setup instructions" — runs on startup
```

---

## Why we use Spring Boot
| Simple Reason | What it means |
|---|---|
| **Auto-setup** | You just add a dependency — Spring configures it automatically |
| **Built-in server** | No separate Tomcat installation needed — it's included |
| **Works with MySQL, Security, JWT easily** | All these plug in with minimal code |
| **Runs with one command** | `mvn spring-boot:run` and the backend is live |

---

## How we use it

### 1. Main entry point — turns on the app
```java
@SpringBootApplication   // "this is a Spring Boot app, configure everything"
public class EduManageBackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(EduManageBackendApplication.class, args);
        // → server starts at localhost:8080
    }
}
```

### 2. Controllers — the API endpoints (what URLs the frontend can call)
```java
@RestController               // "this class handles web requests, send back JSON"
@RequestMapping("/api/departments")
public class DepartmentController {

    @GetMapping                        // handles GET /api/departments
    public List<Department> getAll() {
        return departmentService.getAllDepartments();
    }

    @PostMapping                       // handles POST /api/departments
    @PreAuthorize("hasRole('ADMIN')")  // only admins can do this
    public Department create(@RequestBody Department dept) {
        return departmentService.createOrUpdateDepartment(dept);
    }
}
```

### 3. Services — the logic layer
```java
@Service   // "this class contains business logic"
public class DepartmentService {
    public List<Department> getAllDepartments() {
        return departmentRepository.findAll();   // simple!
    }
}
```

### 4. application.properties — the settings file
```properties
# Connect to MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/edumanage_db
spring.datasource.username=root
spring.datasource.password=yourpassword

# Auto-create database tables from entity classes
spring.jpa.hibernate.ddl-auto=update

# Show SQL queries in the console (useful for debugging)
spring.jpa.show-sql=true

# Backend runs on this port
server.port=8080
```

### 5. DataInitializer — seeds starter data when server starts
```java
// Runs automatically every time the server boots
// Creates roles (ADMIN, TEACHER, STUDENT, PARENT) if they don't exist
// Creates 6 departments (CSE, IT, ECE, EE, ME, CE) if they don't exist
```

### 6. Start the backend
```cmd
cd edumanage-backend
mvn spring-boot:run
```
→ Backend is live at **http://localhost:8080**
