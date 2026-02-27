# ♟️ Lombok — Java Boilerplate Eliminator

---

## What is it?
Lombok is a Java annotation processor that automatically **generates repetitive code**
(getters, setters, constructors, builders, loggers) at compile time.
Without Lombok, every entity class would be 3× longer.

---

## Where is it used?
Used on **every entity, service, and some controllers** in the backend:
```
edumanage-backend/src/main/java/com/edumanage/backend/
├── entity/
│   ├── User.java           ← @Data @NoArgsConstructor @AllArgsConstructor @Builder
│   ├── Role.java           ← @Data @NoArgsConstructor @AllArgsConstructor @Builder
│   ├── Department.java     ← @Data @NoArgsConstructor @AllArgsConstructor @Builder
│   └── Course.java         ← @Data @NoArgsConstructor @AllArgsConstructor @Builder
├── service/
│   ├── AuthService.java    ← @RequiredArgsConstructor @Slf4j
│   ├── UserService.java    ← @RequiredArgsConstructor
│   └── DepartmentService.java ← @RequiredArgsConstructor
├── controller/             ← @RequiredArgsConstructor on all controllers
└── config/
    └── DataInitializer.java ← @RequiredArgsConstructor @Slf4j
```

---

## Why Lombok?
| Reason | Explanation |
|--------|-------------|
| **Less code** | A 5-field entity class goes from ~80 lines to ~20 lines |
| **No bugs in getters/setters** | Auto-generated code cannot have typos |
| **Builder pattern** | `User.builder().username("admin").email("...").build()` — clean object construction |
| **Dependency injection** | `@RequiredArgsConstructor` creates constructors for Spring to inject `@Autowired` fields |

---

## How it's used in this project

### 1. @Data — generates all getters, setters, equals, hashCode, toString
```java
@Data
public class Department {
    private Long id;
    private String code;
    private String name;
}
// Lombok auto-generates:
// getId(), setId(), getCode(), setCode(), getName(), setName()
// equals(), hashCode(), toString()
```

### 2. @Builder — enables the fluent builder pattern
```java
@Builder
public class Department { ... }

// Used in DataInitializer.java to seed the database:
Department.builder()
    .code("CSE")
    .name("Computer Science & Eng")
    .icon("💻")
    .hod("Dr. Anil Mehta")
    .status("Active")
    .studentCount(320)
    .build();
```

### 3. @NoArgsConstructor & @AllArgsConstructor
```java
@NoArgsConstructor   // generates: public Department() {}
@AllArgsConstructor  // generates: public Department(Long id, String code, ...) {}
```
JPA requires a no-arg constructor to instantiate entities via reflection.

### 4. @RequiredArgsConstructor — constructor-based dependency injection
```java
@Service
@RequiredArgsConstructor  // generates constructor for all final fields
public class DepartmentService {
    private final DepartmentRepository departmentRepository;  // auto-injected
    private final CourseRepository courseRepository;          // auto-injected
}
// Without Lombok you'd write:
// public DepartmentService(DepartmentRepository departmentRepository, CourseRepository courseRepository) {
//     this.departmentRepository = departmentRepository;
//     this.courseRepository = courseRepository;
// }
```

### 5. @Slf4j — injects a logger
```java
@Slf4j
@Configuration
public class DataInitializer {
    // Lombok injects:  private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    public CommandLineRunner initData() {
        return args -> {
            log.info("Initialized role: {}", roleName);
            log.info("Seeded department: {}", dept.getName());
        };
    }
}
```
