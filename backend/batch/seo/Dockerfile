# 빌드 단계
FROM gradle:8.5-jdk21-alpine AS build
WORKDIR /home/gradle/src
COPY --chown=gradle:gradle . .
RUN gradle build --no-daemon -x test

# 실행 단계 (JRE만)
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /home/gradle/src/build/libs/*.jar app.jar

# Gemini API 키 환경변수 주입 (실행 시 .env로 덮어쓰기)
ENV GEMINI_API_KEY=""

ENTRYPOINT ["java", "-jar", "app.jar"]
