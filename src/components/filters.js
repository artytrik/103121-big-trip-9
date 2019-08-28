import {AbstractComponent} from './abstract-component.js';

export class Filters extends AbstractComponent {
  constructor(filters) {
    super();
    this._filters = filters;
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
