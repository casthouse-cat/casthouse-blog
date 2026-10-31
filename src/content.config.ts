import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 글 하나하나의 프론트매터 규칙. 빠진 항목이 있으면 빌드가 실패해서 SEO 누락을 막아준다.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),                       // 글 제목(h1)
    metaTitle: z.string().max(60).optional(), // 검색결과 제목. 없으면 title 사용
    description: z.string().min(40).max(160), // 메타 설명 + 목록 요약
    keywords: z.array(z.string()).default([]),
    category: z.string().default('고양이와 함께 살기'),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    ogImage: z.string().optional(),           // 절대경로(/images/..) 또는 전체 URL
    relatedAnimal: z.string().optional(),     // 글 하단 CTA에 쓸 고양이 이름
    draft: z.boolean().default(false),        // true면 운영 빌드에서 제외
  }),
});

export const collections = { posts };
