# 🗃️ Spring Data JPA + Hibernate — Database ORM

---

## What is it?
**Spring Data JPA** provides repository interfaces that auto-generate database
queries from method names. **Hibernate** is the JPA provider that translates
Java objects ↔ MySQL rows automatically.

---

## Where is it used?
```
edumanage-backend/src/main/java/com/edumanage/backend/
├── entity/
│   ├── User.java           ← @Entity — maps to `users` table
│   ├── Role.java           ← @Entity — maps to `roles` table
│   ├── Department.java     ← @Entity — maps to `departments` table
│   └── Course.java         ← @Entity — maps to `courses` table
└── repository/
    ├── UserRepository.java       ← extends JpaRepository<User, Long>
    ├── RoleRepository.java       ← extends JpaRepository<Role, Long>
    ├── DepartmentRepository.java ← extends JpaRepository<Department, Long>
    └── CourseRepository.java     ← extends JpaRepository<Course, Long>
```

---

## Why Spring Data JPA + Hibernate?
| Reason | Explanation |
|--------|-------------|
| **Zero boilerplate SQL** | Common queries (findAll, findById, save, delete) are inherited — no SQL needed |
| **Auto table creation** | `ddl-auto=update` — Hibernate reads entity classes and creates/updates MySQL tables |
| **Method name queries** | `findByEmail()`, `findByCode()` — Spring generates the SQL from the method name |
| **Relationships** | `@OneToMany`, `@ManyToMany` define table foreign keys and joins in Java |
| **Transaction management** | `@Transactional` ensures database operations are atomic |

---

## How it's used in this project

### 1. Entity classes — Java ↔ Database table mapping

```java
@Entity
@Table(name = "users")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // AUTO_INCREMENT
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;   // BCrypt hash

    private String firstName;
    private String lastName;
    private boolean active = true;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_roles",                           // creates user_roles table
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
```

### 2. Repository interfaces — auto-generated queries
```java
// UserRepository.java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);   // SELECT * FROM users WHERE username=?
    Optional<User> findByEmail(String email);         // SELECT * FROM users WHERE email=?
    Boolean existsByUsername(String username);        // SELECT COUNT(*) ... > 0
    Boolean existsByEmail(String email);
}

// CourseRepository.java
@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByDepartmentId(Long departmentId);  // SELECT * FROM courses WHERE department_id=?
}

// DepartmentRepository.java
@Repository
public interface DepartmentRepository extends JpaRepository<Department, Long> {
    Optional<Department> findByCode(String code);    // SELECT * FROM departments WHERE code=?
}
```

### 3. JpaRepository — built-in methods (no code needed)
```java
// These work out of the box on every repository:
userRepository.findAll()           // SELECT * FROM users
userRepository.findById(1L)        // SELECT * FROM users WHERE id=1
userRepository.save(user)          // INSERT or UPDATE
userRepository.deleteById(1L)      // DELETE FROM users WHERE id=1
userRepository.count()             // SELECT COUNT(*) FROM users
```

### 4. Relationships between entities
```java
// Department has many Courses
@Entity
public class Department {
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    private List<Course> courses;
}

// Course belongs to one Department
@Entity
public class Course {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "department_id")   // creates column department_id in courses table
    private Department department;
}
```

### 5. @Transactional — atomic operations
```java
@Transactional
public Course addCourseToDepartment(Long deptId, Course course) {
    Department dept = departmentRepository.findById(deptId)
        .orElseThrow(() -> new RuntimeException("Department not found"));
    course.setDepartment(dept);
    return courseRepository.save(course);   // If this fails, nothing is saved
}
```

### 6. application.properties — Hibernate config
```properties
spring.jpa.hibernate.ddl-auto=update    # Hibernate auto-creates tables from entities
spring.jpa.show-sql=true                # Prints every generated SQL query to console
spring.jpa.properties.hibernate.format_sql=true   # Pretty-prints the SQL
```
