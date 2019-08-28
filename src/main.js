import {Menu} from './components/menu.js';
import {Info} from './components/info.js';
import {Filters} from './components/filters.js';
import {menuElements} from './data.js';
import {filters} from './data.js';
import {infoElement} from './data.js';
import {render} from './utils.js';
import {Position} from './utils.js';
import {TripController} from './controllers/trip.js';
import {points} from './data.js';

const tripMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsHeaderElements = tripControlsElement.querySelectorAll(`h2`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const tripInfoCostValue = tripInfoElement.querySelector(`.trip-info__cost-value`);

const info = new Info(infoElement);
const filtersElement = new Filters(filters);
const menuElement = new Menu(menuElements);
const tripController = new TripController(tripEventsElement, points)

render(tripControlsHeaderElements[0], menuElement.getElement(), Position.AFTEREND);
render(tripControlsHeaderElements[1], filtersElement.getElement(), Position.AFTEREND);
render(tripInfoElement, info.getElement(), Position.AFTERBEGIN);

tripController.init();




