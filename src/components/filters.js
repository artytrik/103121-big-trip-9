export const makeFilters = (filtersElement) =>
  `<form class="trip-filters" action="#" method="get">
    ${filtersElement.map(({name}) =>
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}">
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`).join(``)}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
