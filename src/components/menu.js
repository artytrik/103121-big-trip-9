import {AbstractComponent} from './abstract-component.js';

export class Menu extends AbstractComponent {
  constructor(menu) {
    super();
    this._menu = menu;
  }

  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${this._menu.map(({name}) => `<a class="trip-tabs__btn  trip-tabs__btn--active" href="#">${name}</a>`).join(``)}
    </nav>`;
  }
}
