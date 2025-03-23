# 1️⃣ //JRE 기반 이미지”**만 있어도 실행은 충분
FROM eclipse-temurin:21-jre

# 2️⃣ 작업 디렉토리 설정
WORKDIR /app

# 3️⃣ JAR 파일 복사
COPY build/libs/BlogProjectBackend-0.0.1-SNAPSHOT.jar app.jar

# 4️⃣ 컨테이너 실행 시 JAR 실행
ENTRYPOINT ["java", "-jar", "app.jar"]
