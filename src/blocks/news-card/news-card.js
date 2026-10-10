export function renderNewsCard(news) {
  return `
    <div class="news-card">
      <div class="news-card__date">${news.date}</div>
      <div class="news-card__title">${news.title}</div>
      <div class="news-card__text">${news.text}</div>
    </div>
  `;
}