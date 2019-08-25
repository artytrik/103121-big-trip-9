import {createElement} from '../util.js';

export class Menu {
  constructor(menu) {
    this._menu = menu;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${this._menu.map(({name}) => `<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${name}</a>`).join(``)}
    </nav>`;
  }
}
