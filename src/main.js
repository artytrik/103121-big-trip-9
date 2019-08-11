import {getMenu} from './components/menu.js';
import {getInfo} from './components/info.js';
import {getFilters} from './components/filters.js';
import {getCardContainer} from './components/card-container.js';
import {getCard} from './components/card.js';
import {getEditCard} from './components/edit-card.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsHeaderElements = tripControlsElement.querySelectorAll(`h2`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);

render(tripControlsHeaderElements[0], getMenu(), `afterend`);
render(tripControlsHeaderElements[1], getFilters(), `afterend`);
render(tripInfoElement, getInfo(), `afterbegin`);
render(tripEventsElement, getCardContainer(), `afterbegin`);

const tripEventsListElement = tripEventsElement.querySelector(`.trip-events__list`);

render(tripEventsListElement, getEditCard(), `beforeend`);

new Array(3).fill(``).forEach(() => render(tripEventsListElement, getCard(), `beforeend`));
