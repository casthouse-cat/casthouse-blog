import type { APIRoute } from 'astro';
import { getPublishedPosts } from '../lib/posts';

// AI 검색·답변 엔진이 사이트의 성격과 글 목록을 한 번에 파악할 수 있게 제공하는 요약 파일
export const GET: APIRoute = async ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const posts = await getPublishedPosts();

  const lines = [
    '# 캐스트하우스 블로그',
    '',
    '> 캐스트하우스(casthouse.co)는 보호소 고양이와 하룻밤을 함께 살아본 뒤 입양을 결정할 수 있는 플랫폼입니다. 이 사이트는 고양이와 함께 사는 현실적인 경험과 입양 전 고민을 정리한 글을 제공합니다.',
    '',
    '## 글',
    ...posts.map((p) => `- [${p.data.title}](${base}/posts/${p.id}): ${p.data.description}`),
    '',
    '## 서비스',
    '- [캐스트하우스 앱](https://casthouse.co): 고양이 소개, 성격 매칭, 함께 살아보기 예약',
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
