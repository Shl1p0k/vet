(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.state=e,this.listeners=new Set}getState(){return this.state}setState(e){this.state=e,this.listeners.forEach(e=>e(this.state))}update(e){this.setState(e(this.state))}subscribe(e){return this.listeners.add(e),()=>this.listeners.delete(e)}},t=class{constructor(e){this.routes=e,window.addEventListener(`hashchange`,()=>this.handleRoute()),this.handleRoute()}handleRoute(){let e=window.location.hash.slice(1)||`/`;(this.routes[e]||this.routes[`/`])()}};function n(){return`
    <header class="header">
      <div class="header__logo">🐾</div>
      <h1 class="header__title">ВЕТЕРИНАРНАЯ КЛИНИКА</h1>
      <nav class="header__nav">
        <a href="#/" class="header__link">Главная</a>
        <a href="#/cabinet" class="header__link">Личный кабинет</a>
      </nav>
    </header>
  `}function r(e=`pets`){return`
    <aside class="sidebar">
      ${[{key:`pets`,label:`Мои питомцы`,href:`#/cabinet`},{key:`history`,label:`История записей`,href:`#`},{key:`profile`,label:`Профиль`,href:`#`}].map(t=>`
        <a href="${t.href}" class="sidebar__item ${t.key===e?`sidebar__item--active`:``}">
          ${t.label}
        </a>
      `).join(``)}
    </aside>
  `}function i(e){return`
    <div class="pet-card">
      <div class="pet-card__photo">${e.photo||`🐱`}</div>
      <div class="pet-card__info">
        <div class="pet-card__name">${e.name}</div>
        <div class="pet-card__breed">${e.breed}</div>
        <div class="pet-card__date">Дата рождения: ${e.birthDate}</div>
      </div>
      <button class="button button--primary">Записаться</button>
    </div>
  `}function a(e){return`
    <div class="news-card">
      <div class="news-card__date">${e.date}</div>
      <div class="news-card__title">${e.title}</div>
      <div class="news-card__text">${e.text}</div>
    </div>
  `}function o(){return`
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
  `}var s=[{id:`labrador`,name:`Лабрадор-ретривер`},{id:`german-shepherd`,name:`Немецкая овчарка`},{id:`golden-retriever`,name:`Золотистый ретривер`},{id:`bulldog`,name:`Бульдог`},{id:`beagle`,name:`Бигль`},{id:`poodle`,name:`Пудель`},{id:`rottweiler`,name:`Ротвейлер`},{id:`yorkshire-terrier`,name:`Йоркширский терьер`},{id:`dachshund`,name:`Такса`},{id:`siberian-husky`,name:`Сибирский хаски`},{id:`chihuahua`,name:`Чихуахуа`},{id:`pug`,name:`Мопс`},{id:`shih-tzu`,name:`Ши-тцу`},{id:`pomeranian`,name:`Померанский шпиц`},{id:`maine-coon`,name:`Мейн-кун`},{id:`british-shorthair`,name:`Британская короткошёрстная`},{id:`persian`,name:`Персидская`},{id:`scottish-fold`,name:`Шотландская вислоухая`},{id:`sphynx`,name:`Сфинкс`},{id:`bengal`,name:`Бенгальская`}],c=class{constructor(){this.breeds=s}async fetchBreeds(){return new Promise(e=>{setTimeout(()=>e(this.breeds),100)})}async searchBreeds(e){let t=await this.fetchBreeds(),n=e.toLowerCase();return t.filter(e=>e.name.toLowerCase().includes(n)).slice(0,10)}};new class{constructor(n){this.root=n,this.apiClient=new c,this.store=new e({pets:[{id:1,name:`Барсик`,breed:`Британская короткошёрстная`,birthDate:`15.05.2023`,photo:`🐱`},{id:2,name:`Мурка`,breed:`Персидская`,birthDate:`20.03.2024`,photo:`🐈`}],news:[{id:1,date:`15.05.2026`,title:`Открытие нового кабинета УЗИ`,text:`Теперь доступна диагностика на современном оборудовании.`},{id:2,date:`13.04.2026`,title:`Вакцинация со скидкой 20%`,text:`До конца месяца действует акция.`},{id:3,date:`12.03.2026`,title:`Новый врач-стоматолог`,text:`Сидорова Елена присоединилась к команде.`},{id:4,date:`11.02.2026`,title:`График работы в праздники`,text:`Обратите внимание на изменения.`}],isModalOpen:!1}),this.router=new t({"/":()=>this.renderHome(),"/cabinet":()=>this.renderCabinet()}),this.store.subscribe(()=>this.render()),this.bindGlobalEvents()}bindGlobalEvents(){document.addEventListener(`click`,e=>{let t=e.target.getAttribute(`data-action`);if(t===`open-modal`&&this.store.update(e=>({...e,isModalOpen:!0})),t===`close-modal`&&this.store.update(e=>({...e,isModalOpen:!1})),e.target.classList.contains(`suggestion`)){let t=document.getElementById(`pet-breed`);if(t){t.value=e.target.getAttribute(`data-breed`);let n=document.getElementById(`breed-suggestions`);n&&(n.innerHTML=``)}}}),document.addEventListener(`submit`,e=>{e.target.id===`add-pet-form`&&(e.preventDefault(),this.handleAddPet(e.target))}),document.addEventListener(`input`,async e=>{if(e.target.id===`pet-breed`){let t=e.target.value.trim(),n=document.getElementById(`breed-suggestions`);if(!n)return;if(t.length<2){n.innerHTML=``;return}try{n.innerHTML=(await this.apiClient.searchBreeds(t)).map(e=>`<div class="suggestion" data-breed="${e.name}">${e.name}</div>`).join(``)}catch(e){console.error(`Ошибка загрузки пород:`,e),n.innerHTML=``}}})}handleAddPet(e){let t=e.querySelector(`#pet-name`).value.trim(),n=e.querySelector(`#pet-breed`).value.trim(),r=e.querySelector(`#pet-birth`).value,i=!1;t?e.querySelector(`#error-name`).textContent=``:(e.querySelector(`#error-name`).textContent=`Укажите кличку`,i=!0),n?e.querySelector(`#error-breed`).textContent=``:(e.querySelector(`#error-breed`).textContent=`Укажите породу`,i=!0),r?e.querySelector(`#error-birth`).textContent=``:(e.querySelector(`#error-birth`).textContent=`Укажите дату рождения`,i=!0),!i&&this.store.update(e=>({...e,pets:[...e.pets,{id:Date.now(),name:t,breed:n,birthDate:new Date(r).toLocaleDateString(`ru-RU`),photo:`🐾`}],isModalOpen:!1}))}render(){(window.location.hash.slice(1)||`/`)===`/cabinet`?this.renderCabinet():this.renderHome()}renderHome(){let{news:e}=this.store.getState();this.root.innerHTML=`
      ${n()}
      <main class="main">
        <h2 class="main__title">Новости клиники</h2>
        <div class="news-list">
          ${e.map(e=>a(e)).join(``)}
        </div>
      </main>
    `}renderCabinet(){let{pets:e,isModalOpen:t}=this.store.getState();this.root.innerHTML=`
      ${n()}
      <div class="cabinet">
        ${r(`pets`)}
        <main class="cabinet__content">
          <h2 class="cabinet__title">Мои питомцы</h2>
          <div class="pets-list">
            ${e.map(e=>i(e)).join(``)}
          </div>
          <button class="button button--outline" data-action="open-modal">+ Добавить питомца</button>
        </main>
      </div>
      ${t?o():``}
    `}}(document.getElementById(`app`));