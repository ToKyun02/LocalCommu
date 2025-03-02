<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=F1EFFD&height=200&section=header&text=LocalCommu&fontSize=80&fontColor=0f0f0f&animation=fadeIn"/>
</div>

## 🖐️ 프로젝트 소개

> 혼자 해보는 커뮤니티 웹을 만들고 싶었고, 그렇게 탄생한 것이 LocalCommu입니다!

### 🔒 로그인
- 기본적인 로그인 및 회원가입도 지원합니다.
- 소셜 로그인(구글, 깃허브, 카카오)도 지원합니다.
- 로그인 상태에 따른 리디렉션도 middleware로 구현했습니다.


## 🔧 프로젝트 구조

### 📝 페이지
- / : 랜딩 페이지 => 아직 미구현입니다.
- /map : 지도 API 학습 목적으로 만든 키워드에 따른 마커 생성, 지도 이동
- /post : 게시글 페이지 => 게시글 생성 및 조회 기능까지 완료했습니다.
- /login : 로그인 페이지
- /signup : 회원가입 페이지
- /auth/error : 인증 오류 관련 페이지
- 그 외에 페이지는 현재 개발 진행 중입니다.

### 🖥️ 데이터 접근 객체(DAO)
- 데이터 접근 함수를 분리시키기 위해 Dao 객체로 관리합니다.
- Dao 객체의 네이밍은 도메인별로 지었습니다.
- 정적 메소드로 구현하였기에 객체를 생성하지 않고 호출할 수 있습니다.

### ♻️ 데이터 전송 객체 (DTO)
- DAO를 통해 DB에 데이터를 요청할 때 해당 DTO 모델을 작성할 것입니다.
- 일부는 DAO로 해놨지만, 향후 개선하여 이 프로젝트에선 DTO를 통해서 DAO를 이용하는 것이 목표입니다.

### 💎 주요 기술 스택

- Next.js(v15), React(v19), App Router
- Next-Auth V5
- Prisma (NeonDB로 이용합니다.)
- Tanstack Query
- TypeScript
- Style : Tailwind CSS
- UI Lib : Shadcn


<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=F1EFFD&height=200&section=footer&fontSize=80" />
</div>
