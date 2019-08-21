import {makeMenu} from './components/menu.js';
import {getInfo} from './components/info.js';
import {makeFilters} from './components/filters.js';
import {getCardContainer} from './components/card-container.js';
import {makeCard} from './components/card.js';
import {getEditCard} from './components/edit-card.js';
import {points} from './data.js';
import {menuElements} from './data.js';
import {filters} from './data.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsHeaderElements = tripControlsElement.querySelectorAll(`h2`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripControlsHeaderElements[0], makeMenu(menuElements), `afterend`);
render(tripControlsHeaderElements[1], makeFilters(filters), `afterend`);
render(tripInfoElement, getInfo(), `afterbegin`);
render(tripEventsElement, getCardContainer(), `afterbegin`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, getEditCard(), `beforeend`);

render(tripEventsListElement, points.map(makeCard).join(``), `beforeend`);
