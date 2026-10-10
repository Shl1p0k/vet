import { Store } from './state/store.js';
import { Router } from './router.js';
import { renderHeader } from './blocks/header/header.js';
import { renderSidebar } from './blocks/sidebar/sidebar.js';
import { renderPetCard } from './blocks/pet-card/pet-card.js';
import { renderNewsCard } from './blocks/news-card/news-card.js';
import { renderModal } from './blocks/modal/modal.js';
import { ApiClient } from './services/apiClient.js';

export class App {
  constructor(root) {
    this.root = root;
    this.apiClient = new ApiClient();

    this.store = new Store({
      pets: [
        { id: 1, name: 'Барсик', breed: 'Британская короткошёрстная', birthDate: '15.05.2023', photo: '🐱' },
        { id: 2, name: 'Мурка', breed: 'Персидская', birthDate: '20.03.2024', photo: '🐈' },
      ],
      news: [
        { id: 1, date: '15.05.2026', title: 'Открытие нового кабинета УЗИ', text: 'Теперь доступна диагностика на современном оборудовании.' },
        { id: 2, date: '13.04.2026', title: 'Вакцинация со скидкой 20%', text: 'До конца месяца действует акция.' },
        { id: 3, date: '12.03.2026', title: 'Новый врач-стоматолог', text: 'Сидорова Елена присоединилась к команде.' },
        { id: 4, date: '11.02.2026', title: 'График работы в праздники', text: 'Обратите внимание на изменения.' },
      ],
      isModalOpen: false,
    });

    this.router = new Router({
      '/': () => this.renderHome(),
      '/cabinet': () => this.renderCabinet(),
    });

    this.store.subscribe(() => this.render());
    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    // Клики
    document.addEventListener('click', (e) => {
      const action = e.target.getAttribute('data-action');

      if (action === 'open-modal') {
        this.store.update(s => ({ ...s, isModalOpen: true }));
      }
      if (action === 'close-modal') {
        this.store.update(s => ({ ...s, isModalOpen: false }));
      }

      // Клик по подсказке породы
      if (e.target.classList.contains('suggestion')) {
        const breedInput = document.getElementById('pet-breed');
        if (breedInput) {
          breedInput.value = e.target.getAttribute('data-breed');
          const suggestionsBox = document.getElementById('breed-suggestions');
          if (suggestionsBox) suggestionsBox.innerHTML = '';
        }
      }
    });

    // Отправка формы
    document.addEventListener('submit', (e) => {
      if (e.target.id === 'add-pet-form') {
        e.preventDefault();
        this.handleAddPet(e.target);
      }
    });

    // Автодополнение пород (локальный список через ApiClient)
    document.addEventListener('input', async (e) => {
      if (e.target.id === 'pet-breed') {
        const query = e.target.value.trim();
        const suggestionsBox = document.getElementById('breed-suggestions');
        if (!suggestionsBox) return;

        if (query.length < 2) {
          suggestionsBox.innerHTML = '';
          return;
        }

        try {
          const breeds = await this.apiClient.searchBreeds(query);
          suggestionsBox.innerHTML = breeds
            .map(b => `<div class="suggestion" data-breed="${b.name}">${b.name}</div>`)
            .join('');
        } catch (err) {
          console.error('Ошибка загрузки пород:', err);
          suggestionsBox.innerHTML = '';
        }
      }
    });
  }

  handleAddPet(form) {
    const name = form.querySelector('#pet-name').value.trim();
    const breed = form.querySelector('#pet-breed').value.trim();
    const birthDate = form.querySelector('#pet-birth').value;

    let hasError = false;

    if (!name) {
      form.querySelector('#error-name').textContent = 'Укажите кличку';
      hasError = true;
    } else {
      form.querySelector('#error-name').textContent = '';
    }

    if (!breed) {
      form.querySelector('#error-breed').textContent = 'Укажите породу';
      hasError = true;
    } else {
      form.querySelector('#error-breed').textContent = '';
    }

    if (!birthDate) {
      form.querySelector('#error-birth').textContent = 'Укажите дату рождения';
      hasError = true;
    } else {
      form.querySelector('#error-birth').textContent = '';
    }

    if (hasError) return;

    this.store.update(state => ({
      ...state,
      pets: [
        ...state.pets,
        {
          id: Date.now(),
          name,
          breed,
          birthDate: new Date(birthDate).toLocaleDateString('ru-RU'),
          photo: '🐾',
        },
      ],
      isModalOpen: false,
    }));
  }

  render() {
    const hash = window.location.hash.slice(1) || '/';
    if (hash === '/cabinet') {
      this.renderCabinet();
    } else {
      this.renderHome();
    }
  }

  renderHome() {
    const { news } = this.store.getState();
    this.root.innerHTML = `
      ${renderHeader()}
      <main class="main">
        <h2 class="main__title">Новости клиники</h2>
        <div class="news-list">
          ${news.map(n => renderNewsCard(n)).join('')}
        </div>
      </main>
    `;
  }

  renderCabinet() {
    const { pets, isModalOpen } = this.store.getState();
    this.root.innerHTML = `
      ${renderHeader()}
      <div class="cabinet">
        ${renderSidebar('pets')}
        <main class="cabinet__content">
          <h2 class="cabinet__title">Мои питомцы</h2>
          <div class="pets-list">
            ${pets.map(p => renderPetCard(p)).join('')}
          </div>
          <button class="button button--outline" data-action="open-modal">+ Добавить питомца</button>
        </main>
      </div>
      ${isModalOpen ? renderModal() : ''}
    `;
  }
}