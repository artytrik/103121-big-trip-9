import {AbstractComponent} from './abstract-component.js';

export class Menu extends AbstractComponent {
  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" id="table-button" href="#">Table</a>
      <a class="trip-tabs__btn" id="stats-button" href="#">Stats</a>
    </nav>`;
  }
}
