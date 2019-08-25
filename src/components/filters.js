import {createElement} from '../util.js';

export class Filters {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
      ${this._filters.map(({name}) =>
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}">
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`).join(``)}

    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }
}
