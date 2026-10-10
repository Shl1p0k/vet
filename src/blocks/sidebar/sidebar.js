export function renderSidebar(activeItem = 'pets') {
  const items = [
    { key: 'pets', label: 'Мои питомцы', href: '#/cabinet' },
    { key: 'history', label: 'История записей', href: '#' },
    { key: 'profile', label: 'Профиль', href: '#' },
  ];

  return `
    <aside class="sidebar">
      ${items.map(item => `
        <a href="${item.href}" class="sidebar__item ${item.key === activeItem ? 'sidebar__item--active' : ''}">
          ${item.label}
        </a>
      `).join('')}
    </aside>
  `;
}