import { getCollection } from 'astro:content';

// 초안(draft: true)은 INCLUDE_DRAFTS=1 로 빌드할 때만 포함된다.
export async function getPublishedPosts() {
  const includeDrafts = process.env.INCLUDE_DRAFTS === '1';
  const posts = await getCollection('posts', ({ data }) => includeDrafts || !data.draft);
  return posts.sort((a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime());
}

export const APP_URL = 'https://casthouse.co';

// 앱으로 넘어가는 링크. 어떤 글에서 왔는지 GA에서 구분할 수 있게 UTM을 붙인다.
export function appLink(slug: string, path = '') {
  const params = new URLSearchParams({
    utm_source: 'blog',
    utm_medium: 'content',
    utm_campaign: slug,
  });
  return `${APP_URL}${path}?${params.toString()}`;
}

// 카드뉴스 글(cardCount가 있는 글). 카드뉴스가 이 수 이상이면 "카드뉴스" 카테고리 칩이 나타난다.
export const CARDNEWS_CHIP_MIN = 3;
export async function getCardNewsPosts() {
  const posts = await getPublishedPosts();
  return posts.filter((p) => p.data.cardCount && p.data.thumbnail);
}
