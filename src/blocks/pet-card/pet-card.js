export function renderPetCard(pet) {
  return `
    <div class="pet-card">
      <div class="pet-card__photo">${pet.photo || '🐱'}</div>
      <div class="pet-card__info">
        <div class="pet-card__name">${pet.name}</div>
        <div class="pet-card__breed">${pet.breed}</div>
        <div class="pet-card__date">Дата рождения: ${pet.birthDate}</div>
      </div>
      <button class="button button--primary">Записаться</button>
    </div>
  `;
}