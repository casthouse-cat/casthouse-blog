# 캐스트하우스 가이드 (blog.casthouse.co)

Astro 정적 사이트. 글은 `src/content/posts/*.md` 마크다운 파일이고, 빌드하면 완성된 HTML이 나와서 검색엔진·AI 크롤러가 본문을 그대로 읽어요.

## 글 올리기
1. `src/content/posts/` 에 `원하는-주소.md` 파일을 만든다. 파일 이름이 글 주소(slug)가 된다.
2. 맨 위에 프론트매터를 채운다 (빠지면 빌드가 실패한다).
   - `title`, `description`(40~160자), `publishedAt`, `keywords`, `category`
   - 선택: `metaTitle`(60자 이하), `ogImage`, `relatedAnimal`, `updatedAt`
   - `draft: true` 이면 공개되지 않는다. 발행할 때 지우거나 `false`로 바꾼다.
3. 저장소에 올리면(push) 호스팅이 자동으로 다시 빌드한다.

## 로컬 확인
```
npm install
npm run dev                    # 개발 서버
INCLUDE_DRAFTS=1 npm run build # 초안 포함 빌드
```

## 구조 메모
- `src/layouts/Base.astro`: 공통 레이아웃과 메타태그 · OG · JSON-LD
- `src/lib/posts.ts`: 앱(casthouse.co)으로 가는 링크에 UTM(`utm_campaign=글 주소`)을 붙인다.
- `llms.txt`, `robots.txt`, `sitemap-index.xml`은 빌드 때 자동 생성된다.
