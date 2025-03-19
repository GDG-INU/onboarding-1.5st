# 1️⃣ Java 21을 지원하는 OpenJDK 기반 이미지 사용
FROM eclipse-temurin:21-jdk AS runtime

# 2️⃣ 작업 디렉토리 설정
WORKDIR /app

# 3️⃣ JAR 파일 복사
COPY build/libs/BlogProjectBackend-0.0.1-SNAPSHOT.jar app.jar

# 4️⃣ 컨테이너 실행 시 JAR 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
