import breedsData from '../data/breeds.json';

export class ApiClient {
  constructor() {
    this.breeds = breedsData;
  }

  /**
   * Возвращает все породы.
   * В реальном проекте здесь был бы fetch к внешнему API.
   */
  async fetchBreeds() {
    // Имитация задержки сети для демонстрации асинхронности
    return new Promise(resolve => {
      setTimeout(() => resolve(this.breeds), 100);
    });
  }

  /**
   * Поиск пород по подстроке.
   * @param {string} query - поисковый запрос
   * @returns {Promise<Array>} - массив подходящих пород
   */
  async searchBreeds(query) {
    const all = await this.fetchBreeds();
    const lowerQuery = query.toLowerCase();
    return all
      .filter(b => b.name.toLowerCase().includes(lowerQuery))
      .slice(0, 10);
  }
}