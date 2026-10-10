export function renderModal() {
  return `
    <div class="modal" id="modal">
      <div class="modal__window">
        <h2 class="modal__title">Добавить питомца</h2>
        <form class="modal__form" id="add-pet-form">
          <div class="field">
            <label class="field__label" for="pet-name">Кличка</label>
            <input class="field__input" type="text" id="pet-name" name="name" required autocomplete="off" />
            <span class="field__error" id="error-name"></span>
          </div>

          <div class="field">
            <label class="field__label" for="pet-breed">Порода</label>
            <input class="field__input" type="text" id="pet-breed" name="breed" required autocomplete="off" />
            <div id="breed-suggestions" class="suggestions"></div>
            <span class="field__error" id="error-breed"></span>
          </div>

          <div class="field">
            <label class="field__label" for="pet-birth">Дата рождения</label>
            <input class="field__input" type="date" id="pet-birth" name="birthDate" required />
            <span class="field__error" id="error-birth"></span>
          </div>

          <div class="modal__actions">
            <button type="button" class="button button--outline" data-action="close-modal">Отмена</button>
            <button type="submit" class="button button--primary">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  `;
}