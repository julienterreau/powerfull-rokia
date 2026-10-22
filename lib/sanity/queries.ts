const image = (field: string) =>
  `"${field}": select(defined(${field}.asset) => {"url": ${field}.asset->url, "alt": ${field}.alt}, null)`;

export const singletonQuery = `*[_id == $id][0]{
  ...,
  ${image("photo")},
  ${image("logo")}
}`;

export const collectionQuery: Record<string, string> = {
  articles: `*[_type == "article"] | order(publishedAt desc) {
    title, slug, excerpt, featured, publishedAt, author, content, seo,
    "category": category->{name, slug, color},
    ${image("cover")}
  }`,
  videos: `*[_type == "video"] | order(publishedAt desc) {
    title, youtubeUrl, duration, description, gradient, featured, publishedAt,
    "category": category->{name, slug, color},
    ${image("thumbnail")}
  }`,
  categories: `*[_type == "category"] | order(name asc) { name, slug, color }`,
  testimonials: `*[_type == "testimonial"] | order(order asc) { handle, text, url, visible }`,
  "faq-items": `*[_type == "faqItem"] | order(order asc) { question, answer, order, showOnHome }`,
  "diagnostic-audios": `*[_type == "diagnosticAudio" && isActive != false] | order(order asc) {
    order, title, "url": file.asset->url
  }`,
  "diagnostic-results": `*[_type == "diagnosticResult"] | order(minScore asc) { minScore, maxScore, title, text }`,
};

export const legalPageQuery = `*[_type == "legalPage" && slug == $slug][0]{
  title, slug, eyebrow, lead, content, seo
}`;

export const legalListQuery = `*[_type == "legalPage" && defined(slug)]{ title, slug }`;

export const guestbookQuery = `*[_type == "guestbookEntry"] | order(_createdAt asc) {
  "id": _id,
  authorName,
  message,
  fromClient,
  "createdAt": _createdAt,
  "parent": parent._ref
}`;

export const reactionsQuery = `*[_type == "guestbookReaction"] {
  "entry": entry._ref,
  emoji,
  visitorId
}`;
