# 🚀 GDG 인천대학교 온보딩 - 블로그 프로젝트

## 📝 프로젝트 개요
**목표**: 신입 백엔드 부원이 협업하여 블로그 프로젝트를 완성하고 실전 감각을 익히도록 합니다.

### 대상
- SpringBoot를 이용한 CRUD 프로그래밍이 가능한 백엔드 신입 부원

### 진행 방식
- **주 단위 과제** → **PR 작성** → **코드리뷰 반영**
- **API 문서 작성** 및 **Swagger** 적용
- 실무 환경과 유사하게 **Git Flow** 사용 (develop/main 브랜치 활용)
- **💡 상시 Q&A 적극 활용 필수! (궁금한 점 있으면 언제든 질문하세요!)**

### 프로젝트 주요 기능
- 회원 가입 & 로그인 (JWT 인증)
- 게시글 CRUD
- 댓글 & 좋아요 기능
- API 문서화
- AWS를 통한 배포

## 과제 안내

각 주차별 과제에 대한 자세한 안내와 참고자료는 아래 링크에서 확인할 수 있습니다:

📍 [1주차 과제: 프로젝트 세팅 & 회원 기능 구현](tasks/week1.md)

📍 [2주차 과제: 게시글 CRUD 및 목록 조회](tasks/week2.md)

📍 [3주차 과제: 댓글 기능 + 좋아요 + 배포 준비](tasks/week3.md)

## 🗓 OnBoarding 3주 계획 개요

### 📍 1주 차: 프로젝트 세팅 & 회원 기능 구현
>**목표**: 백엔드 협업을 위한 환경을 설정하고, 회원가입/로그인 기능을 구현합니다.

#### 주요 과제
- Spring Boot 환경 세팅
- 데이터베이스 연동 및 JPA 설정
- Spring Security & JWT 기반 회원가입/로그인 구현
- Swagger API 문서 작성

### 📍 2주 차: 게시글 CRUD 및 목록 조회
>**목표**: 블로그의 핵심 기능인 게시글 CRUD와 목록 조회 기능을 구현합니다.

#### 주요 과제
- 게시글 작성/수정/삭제 API 구현
- 게시글 목록 조회 API (페이지네이션 적용)
- 게시글 상세 조회 API (조회수 증가 로직 포함)

### 📍 3주 차: 댓글 기능 + 좋아요 + 배포 준비
>**목표**: 블로그 사용자와의 상호작용 기능 추가 및 배포 환경 준비

#### 주요 과제
- 댓글 작성/삭제 API 구현
- 게시글 좋아요 기능 구현
- Docker, GitHub Actions, AWS 를 통한 배포 연습

## 🎯 최종 목표 (3주 후 기대 성과)
- **백엔드**: Spring Boot 기반 REST API 개발 능력 향상
- **협업 능력 향상**: PR 리뷰 프로세스 경험
- **배포 경험**: GitHub Actions & AWS 배포 프로세스 경험

## 💻 개발 환경 설정 가이드

### Backend 환경 설정
1. **JDK 설치**: JDK 17 이상 설치
2. **IDE 설치**: IntelliJ IDEA 또는 Eclipse 설치
3. **데이터베이스**: MySQL 설치 및 설정

### Git 사용 가이드
1. 레포지토리 클론
   ```bash
   git clone https://github.com/GDG-INU/backend-onboarding-1.5st.git
   ```

2. 브랜치 전략 
   - `main`: 제품 배포용 브랜치
   - `develop`: 개발 통합 브랜치
   - `feature/[기능명]`: 각 기능 개발 브랜치
   - `fix/[버그명]`: 버그 수정 브랜치

3. 새 기능 개발 시작
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/user-authentication
   ```

4. 작업 후 커밋 및 푸시
   ```bash
   git add .
   git commit -m "[기능] 회원가입 API 구현"
   git push origin feature/user-authentication
   ```

5. PR 작성
   - GitHub에서 `develop` 브랜치로 PR 작성
   - PR 템플릿 작성
   - 리뷰어 지정

## ❓ 자주 묻는 질문 (FAQ)

1. **Q: PR을 올릴 때 어떤 정보를 포함해야 하나요?**
   - A: 구현한 기능 설명, 테스트 방법, 변경된 주요 파일 등을 포함해주세요.

2. **Q: 코드 컨벤션은 어떻게 따라야 하나요?**
   - A: Google Java Style Guide를 기본으로 따릅니다. IntelliJ 사용자는 해당 스타일 가이드 플러그인 설치를 권장합니다.

3. **Q: API 설계 시 고려해야 할 점은 무엇인가요?**
   - A: RESTful 원칙 준수, 명확한 URL 패턴, 적절한 HTTP 메서드 사용, 일관된 응답 포맷 등을 고려해주세요.

4. **Q: 커밋 메시지는 어떻게 작성하는 것이 좋을까요?**
   - A: `[유형] 내용` 형식으로 작성합니다. 유형은 feat, fix, docs, style, refactor, test, chore 등을 사용합니다.

© 2025 GDG 인천대학교. All Rights Reserved.
