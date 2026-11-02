import { getPublishedPosts } from './posts';

// 카테고리 이름 → 주소(영문 슬러그). 새 카테고리를 만들면 여기에 한 줄 추가하면 영문 주소가 된다.
// 목록에 없는 카테고리는 이름의 공백을 하이픈으로 바꾼 주소가 자동으로 쓰인다.
const SLUGS: Record<string, string> = {
  '캐스트하우스 이야기': 'casthouse-story',
  '입양 가이드': 'adoption-guide',
  'FAQ': 'faq',
};

export function categorySlug(name: string) {
  return SLUGS[name] ?? name.trim().replace(/\s+/g, '-');
}

export function categoryPath(name: string) {
  return `/category/${categorySlug(name)}`;
}

// 글이 있는 카테고리 목록 (글이 많은 순서가 아니라 첫 등장 순서)
export async function getCategories() {
  const posts = await getPublishedPosts();
  return [...new Set(posts.map((p) => p.data.category))];
}
