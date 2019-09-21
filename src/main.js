import {Menu} from './components/menu.js';
import {Info} from './components/info.js';
import {Filters} from './components/filters.js';
import {filters} from './data.js';
import {infoElement} from './data.js';
import {render} from './utils.js';
import {Position} from './utils.js';
import {TripController} from './controllers/trip.js';
import {points} from './data.js';
import {getTripCost} from './utils.js';
import Statistics from './components/statistics.js';

const tripMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsHeaderElements = tripControlsElement.querySelectorAll(`h2`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const tripInfoCostValue = tripInfoElement.querySelector(`.trip-info__cost-value`);

const info = new Info(infoElement);
const filtersElement = new Filters(filters);
const menuElement = new Menu();
const tripController = new TripController(tripEventsElement, points);
const statistics = new Statistics();
statistics.getElement().classList.add(`visually-hidden`);

render(tripControlsHeaderElements[0], menuElement.getElement(), Position.AFTEREND);
render(tripControlsHeaderElements[1], filtersElement.getElement(), Position.AFTEREND);
render(tripInfoElement, info.getElement(), Position.AFTERBEGIN);
render(pageBodyContainer, statistics.getElement(), Position.BEFOREEND);

tripController.init();

menuElement.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `A`) {
    return;
  }

  evt.target.classList.add(`trip-tabs__btn--active`);

  switch (evt.target.id) {
    case `table-button`:
      statistics.getElement().classList.add(`visually-hidden`);
      tripController.show();
      break;
    case `stats-button`:
      tripController.hide();
      statistics.getElement().classList.remove(`visually-hidden`);
      break;
  }
});

tripInfoCostValue.textContent = getTripCost(points);




