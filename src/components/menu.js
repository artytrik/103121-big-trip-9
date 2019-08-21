export const makeMenu = (menuElement) =>
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${menuElement.map(({name}) => `<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${name}</a>`).join(``)}
  </nav>`;

