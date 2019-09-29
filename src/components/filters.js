import AbstractComponent from './abstract-component.js';

class Filters extends AbstractComponent {
  constructor(filterTabs) {
    super();
    this._filterTabs = filterTabs;
  }

  getTemplate() {
    return `<form class="trip-filters" action="#" method="get">
    ${this._filterTabs.map((filter) => `<div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}">
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`).join(``)}
    <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
  }
}

export default Filters;
