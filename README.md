# AI Tarot

GPT-3.5를 활용한 AI 타로 리딩 서비스입니다. 사용자가 선택한 테마와 디자인에 따라 맞춤형 타로 카드 해석을 제공합니다.

## 주요 기능

- 테마별 타로 리딩 (연애, 건강, 재물 등)
- 다양한 디자인 테마 선택 (Beauty, Cute, Dark)
- GPT-3.5 기반의 전문적인 타로 카드 해석
- 카카오톡 결과 공유 기능
- 모바일 반응형 디자인
- 타로 가이드 페이지
- 이전 리딩 히스토리 확인

## 기술 스택

### 프론트엔드
- Next.js 13+
- React
- CSS Modules

### 백엔드
- Next.js API Routes
- OpenAI GPT-3.5 API

### 공유 기능
- Kakao SDK

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
