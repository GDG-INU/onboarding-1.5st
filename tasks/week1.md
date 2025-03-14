# 📍 1주차 과제: 프로젝트 세팅 & 회원 기능 구현

## 🎯 목표
백엔드 협업을 위한 환경을 설정하고, 회원가입/로그인 기능을 구현합니다.

## 📋 세부 과제

### 1️⃣ 프로젝트 환경 세팅
- Spring Boot + Gradle 기반 프로젝트 생성
- 데이터베이스(RDB) 연동
- JPA 설정 및 기본적인 엔티티 설계

### 2️⃣ 회원 기능 구현
- Spring Security & JWT 기반 회원가입/로그인 구현
- **회원 가입 API** (비밀번호 암호화)
- **로그인 API** (JWT 발급)
- **사용자 정보 조회 API**
- **Swagger API 문서 작성**

### 3️⃣ PR & 리뷰
- 백엔드: 회원 기능 PR 작성 → 코드 리뷰 → 개선 사항 반영

## 🛠️ 기술 스택 및 환경

### 필수 환경
- JDK 17 이상
- Spring Boot 3.x
- MySQL 8.0
- Spring Data JPA
- Spring Security
- JWT (io.jsonwebtoken:jjwt 라이브러리 사용 권장)
- SpringDoc OpenAPI (Swagger UI)

## 📝 참고 자료 및 가이드

### 프로젝트 구조 예시
```
src
├── main
│   ├── java
│   │   └── com
│   │       └── gdg
│   │           └── blog
│   │               ├── BlogApplication.java
│   │               ├── config
│   │               │   ├── SecurityConfig.java
│   │               │   ├── SwaggerConfig.java
│   │               │   └── WebConfig.java
│   │               ├── controller
│   │               │   ├── AuthController.java
│   │               │   └── UserController.java
│   │               ├── dto
│   │               │   ├── request
│   │               │   │   ├── LoginRequest.java
│   │               │   │   └── SignupRequest.java
│   │               │   └── response
│   │               │       ├── LoginResponse.java
│   │               │       └── UserResponse.java
│   │               ├── entity
│   │               │   └── User.java
│   │               ├── exception
│   │               │   ├── CustomException.java
│   │               │   ├── ErrorCode.java
│   │               │   └── GlobalExceptionHandler.java
│   │               ├── repository
│   │               │   └── UserRepository.java
│   │               ├── security
│   │               │   ├── JwtTokenProvider.java
│   │               │   ├── JwtAuthenticationFilter.java
│   │               │   └── UserDetailsServiceImpl.java
│   │               └── service
│   │                   ├── AuthService.java
│   │                   └── UserService.java
│   └── resources
│       └── application.yml
└── test
    └── java
        └── com
            └── gdg
                └── blog
                    ├── controller
                    │   └── AuthControllerTest.java
                    ├── repository
                    │   └── UserRepositoryTest.java
                    └── service
                        └── AuthServiceTest.java
```

### application.yml 기본 설정
```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/gdg_blog?useSSL=false&serverTimezone=UTC
    username: root
    password: your_password
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
  output:
    ansi:
      enabled: always

server:
  port: 8080

jwt:
  secret: your_jwt_secret_key_here_make_it_long_enough_for_security
  expiration: 86400000 # 1일 (밀리초 단위)
```

### build.gradle 의존성 추가
```gradle
dependencies {
    implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
    implementation 'org.springframework.boot:spring-boot-starter-security'
    implementation 'org.springframework.boot:spring-boot-starter-validation'
    implementation 'org.springframework.boot:spring-boot-starter-web'
    
    // JWT
    implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-impl:0.11.5'
    runtimeOnly 'io.jsonwebtoken:jjwt-jackson:0.11.5'
    
    // Swagger
    implementation 'org.springdoc:springdoc-openapi-starter-webmvc-ui:2.3.0'
    
    compileOnly 'org.projectlombok:lombok'
    developmentOnly 'org.springframework.boot:spring-boot-devtools'
    runtimeOnly 'com.mysql:mysql-connector-j'
    annotationProcessor 'org.projectlombok:lombok'
    testImplementation 'org.springframework.boot:spring-boot-starter-test'
    testImplementation 'org.springframework.security:spring-security-test'
}
```

## 💡 구현 시 참고사항

### 1. User 엔티티 예시
```java
@Entity
@Table(name = "users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String name;
    
    @Column(nullable = false, unique = true)
    private String nickname;
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
    
    // 생성자, 정적 팩토리 메서드 등 추가
}
```

### 2. JWT 인증 구현 시 고려사항
- `JwtTokenProvider` 클래스를 만들어 토큰 생성, 검증 로직 구현
- `JwtAuthenticationFilter`를 통해 요청에서 JWT 추출하고 인증 처리
- 로그인 성공 시 JWT 발급, 응답으로 토큰 반환
- 사용자 정보 조회 API는 인증된 사용자만 접근 가능하도록 설정

### 3. SpringDoc OpenAPI (Swagger) 설정
```java
@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("GDG Blog API")
                        .version("1.0")
                        .description("GDG 인천대학교 블로그 프로젝트 API 문서"));
    }
}
```

### 4. API 응답 형식 통일
```java
@Getter
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private T data;
    private String message;
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, data, null);
    }
    
    public static <T> ApiResponse<T> success(T data, String message) {
        return new ApiResponse<>(true, data, message);
    }
    
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, null, message);
    }
}
```

## 📋 제출 방법
1. 주어진 레포지토리 클론 후 작업
2. `develop` 브랜치에서 `feature/user-authentication` 등의 브랜치 생성
3. 기능 구현 후 PR 작성 (PR 템플릿 참고)
4. 코드 리뷰 후 수정사항 반영

## ✅ 평가 기준
- 구현 완성도 (요구사항 충족 여부)
- 코드 품질 및 구조
- API 설계 적절성
- 예외 처리 및 로깅
- Swagger 문서 작성 품질

## ⏰ 제출 기한
- 1주차 과제 제출 마감: 2025년 3월 21일 23:59
