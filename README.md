# AI 타로 웹사이트 개선 프로젝트

## 프로젝트 개요
AI 타로 카드 웹사이트의 성능, 디자인, 콘텐츠 개선을 위한 프로젝트입니다. 사용자 경험 향상과 SEO 최적화를 목표로 합니다.

## 주요 개선사항

### 1. 디자인 개선
- 블로그와 FAQ 페이지의 폰트 색상을 골드와 화이트로 통일하여 일관된 브랜드 이미지 구축
- 반응형 디자인 개선으로 모바일 최적화
- 이미지 로딩 최적화 및 깨진 이미지 수정

### 2. 콘텐츠 개선
- 타로 카드 상세 페이지 템플릿 개선 (구조화된 데이터, 읽기 예시 섹션 추가)
- 랜딩 페이지에 블로그 프리뷰 섹션 추가
- 메타데이터 최적화로 검색 노출 개선
 
### 3. 소셜 미디어 통합
- 모든 페이지에 소셜 공유 버튼 추가
- OpenGraph 및 Twitter 카드 메타데이터 업데이트
- 소셜 미디어 공유 시 최적화된 이미지 및 텍스트 제공

### 4. 기술적 개선
- 구조화된 데이터(JSON-LD) 추가로 검색엔진 최적화
- 이미지 지연 로딩(lazy loading) 구현
- 페이지 로딩 속도 최적화 
  - CSS 최적화
  - 폰트 로딩 최적화 (font-display: swap)
  - 광고 스크립트 비동기 로딩
  - 리소스 힌팅 및 프리로딩
- 성능 모니터링 컴포넌트 적용 (PerformanceOptimizer)

## 성능 최적화 기법
- 이미지 최적화: 적절한 크기와 형식으로 이미지 최적화
- CSS 최적화: 중요 CSS 인라인화 및 비필수 CSS 지연 로딩
- 자바스크립트 최적화: 비동기 로딩 및 코드 스플리팅
- 폰트 최적화: font-display: swap으로 폰트 렌더링 최적화
- 리소스 힌팅: DNS-prefetch, preconnect, preload로 리소스 로딩 최적화
- HTML 최적화: 구조화된 데이터로 검색 엔진 최적화

## 차후 개선 계획
- PWA(Progressive Web App) 기능 추가
- 사용자 인터랙션 분석 도구 도입
- 국제화(i18n) 지원 확대
- 추가 성능 최적화 및 접근성 개선

## 기술 스택
- Next.js
- React
- CSS Modules
- Structured Data (JSON-LD)
- Modern JavaScript (ES6+)

## 웹사이트 구조
- 홈: 메인 랜딩 페이지
- 카드: 타로 카드 상세 페이지
- 블로그: 타로 관련 컨텐츠
- FAQ: 자주 묻는 질문
- 가이드: 타로 카드 사용 가이드
- 히스토리: 타로 읽기 히스토리

## 주요 기능

- 테마별 타로 리딩 (연애, 건강, 재물 등)
- 다양한 디자인 테마 선택 (Beauty, Cute, Dark)
- GPT-3.5 기반의 전문적인 타로 카드 해석
- 카카오톡 결과 공유 기능
- 모바일 반응형 디자인
- 타로 가이드 페이지
- 이전 리딩 히스토리 확인

## 프로젝트 구조

```
ai-tarot/
├── src/
│   └── app/
│       ├── [theme]/              # 테마별 페이지
│       ├── [design]/             # 디자인 선택 페이지
│       ├── result/[result]/      # 결과 페이지
│       ├── api/tarot/            # API 라우트
│       ├── guide/                # 가이드 페이지
│       ├── history/              # 히스토리 페이지
│       └── major/                # 메인 페이지
├── components/
│   ├── CardSelector.js          # 카드 선택 컴포넌트
│   ├── DesignSelector.js        # 디자인 선택 컴포넌트
│   ├── KakaoScript.js          # 카카오 SDK 스크립트
│   ├── KakaoShareButton.js     # 카카오 공유 버튼
│   ├── Result.js               # 결과 표시 컴포넌트
│   └── ThemeSelector.js        # 테마 선택 컴포넌트
├── styles/
│   ├── GuidePage.module.css
│   ├── MajorPage.module.css
│   ├── Quiz.module.css
│   └── Result.module.css
└── public/
    ├── images/
    │   ├── Beauty/             # 뷰티 테마 이미지
    │   ├── Cute/               # 큐트 테마 이미지
    │   ├── Dark/               # 다크 테마 이미지
    │   └── icons/              # 공통 아이콘
    └── font/                   # 커스텀 폰트

```

## 시작하기

### 필수 요구사항
- Node.js 16.0.0 이상
- OpenAI API 키
- Kakao JavaScript SDK 키

### 설치 방법

1. 레포지토리 클론
```bash
git clone https://github.com/kyunghoonkook/ai_tarot.git
cd ai_tarot
```

2. 의존성 설치
```bash
npm install
```

3. 환경 변수 설정
`.env.local` 파일을 생성하고 다음 변수들을 설정하세요:
```
OPENAI_API_KEY=your_api_key_here
NEXT_PUBLIC_KAKAO_SDK_KEY=your_kakao_sdk_key_here
```

4. 개발 서버 실행
```bash
npm run dev
```

5. 브라우저에서 `http://localhost:3000` 접속

## 주요 컴포넌트

- `CardSelector`: 타로 카드 선택 인터페이스
- `DesignSelector`: 테마 디자인 선택 컴포넌트
- `KakaoShareButton`: 카카오톡 공유 기능
- `Result`: 타로 리딩 결과 표시
- `ThemeSelector`: 타로 테마 선택 (연애, 건강, 재물 등)

## API 엔드포인트

- `POST /api/tarot/route` - GPT 기반 타로 카드 해석 API

## 스타일링

- CSS Modules를 사용하여 컴포넌트별 스타일 분리
- 반응형 디자인 구현
- 3가지 테마 디자인 (Beauty, Cute, Dark)

## 라이선스

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 작성자

Kyunghoon Kook

---
더 자세한 정보나 문의사항은 이슈를 생성해주세요.
