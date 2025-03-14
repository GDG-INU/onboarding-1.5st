# 📍 2주차 과제: 게시글 CRUD 및 목록 조회

## 🎯 목표
블로그의 핵심 기능인 게시글 CRUD와 목록 조회 기능을 구현합니다.

## 📋 세부 과제

### 1️⃣ 게시글 기능 구현
- **게시글 작성 API** (제목, 내용, 작성자, 태그 등)
- **게시글 수정 API** (JWT 인증 필요)
- **게시글 삭제 API** (JWT 인증 필요)
- **게시글 목록 조회 API** (페이지네이션 적용)
- **게시글 상세 조회 API** (조회수 증가 로직 포함)

### 2️⃣ 기능 확장
- 태그 기능 구현 (게시글에 태그 추가, 태그별 게시글 조회)
- 게시글 검색 기능 (제목, 내용 기준)

### 3️⃣ PR & 리뷰
- 백엔드: 게시글 기능 PR 작성 → 코드 리뷰 후 반영

## 🛠️ 핵심 기술 요소

### 1. 엔티티 관계 설계
- `Post` 엔티티와 `User` 엔티티 간의 관계 설정
- `Post`와 `Tag` 엔티티 간의 다대다 관계 설정

### 2. 페이지네이션 구현
- Spring Data JPA의 `Pageable` 인터페이스 활용
- 정렬 기능 (최신순, 조회수순 등) 구현

### 3. 권한 체크
- 게시글 수정/삭제 시 작성자 본인인지 검증
- Spring Security의 `@PreAuthorize` 또는 Custom 어노테이션 활용

## 📝 API 구현 가이드

### API 명세 예시

#### 게시글 작성 API
- **URL**: `/api/posts`
- **Method**: POST
- **Request**:
  ```json
  {
    "title": "게시글 제목",
    "content": "게시글 내용",
    "tags": ["Spring", "JPA"]
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "title": "게시글 제목",
      "content": "게시글 내용",
      "author": {
        "id": 1,
        "nickname": "작성자닉네임"
      },
      "viewCount": 0,
      "tags": ["Spring", "JPA"],
      "createdAt": "2025-03-20T10:00:00"
    },
    "message": "게시글이 성공적으로 작성되었습니다."
  }
  ```

#### 게시글 목록 조회 API
- **URL**: `/api/posts?page=0&size=10&sort=createdAt,desc`
- **Method**: GET
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "content": [
        {
          "id": 1,
          "title": "게시글 제목",
          "author": {
            "id": 1,
            "nickname": "작성자닉네임"
          },
          "viewCount": 5,
          "createdAt": "2025-03-20T10:00:00"
        }
      ],
      "pageable": {
        "pageNumber": 0,
        "pageSize": 10,
        "sort": [
          {
            "direction": "DESC",
            "property": "createdAt"
          }
        ]
      },
      "totalElements": 1,
      "totalPages": 1
    },
    "message": null
  }
  ```

## 📋 제출 방법
1. `develop` 브랜치에서 `feature/post-management` 등의 브랜치 생성
2. 기능 구현 후 PR 작성 (PR 템플릿 참고)
3. 코드 리뷰 후 수정사항 반영

## ✅ 평가 기준
- 구현 완성도 (요구사항 충족 여부)
- 코드 품질 및 구조
- JPA 연관관계 설계 적절성
- 페이지네이션 및 검색 기능 구현
- 예외 처리 및 권한 체크 로직 구현
- Swagger 문서 업데이트

## ⏰ 제출 기한
- 2주차 과제 제출 마감: 2025년 3월 28일 23:59
