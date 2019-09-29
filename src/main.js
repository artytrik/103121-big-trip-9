import {Menu} from './components/menu.js';
import {Info} from './components/info.js';
import {Filters} from './components/filters.js';
import {infoElement} from './data.js';
import {render} from './utils.js';
import {Position} from './utils.js';
import {TripController} from './controllers/trip.js';
import {points} from './data.js';
import {getTripCost} from './utils.js';
import Statistics from './components/statistics.js';
import API from './api.js';

const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;

const tripMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsHeaderElements = tripControlsElement.querySelectorAll(`h2`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const tripInfoCostValue = tripInfoElement.querySelector(`.trip-info__cost-value`);
const eventAddButton = tripMainElement.querySelector(`.trip-main__event-add-btn`);

let tripController;
let tripDestinations;
let tripAdditionalOptions;
const info = new Info(infoElement);
const filtersElement = new Filters();
const menuElement = new Menu();
const statistics = new Statistics();
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
statistics.getElement().classList.add(`visually-hidden`);

render(tripControlsHeaderElements[0], menuElement.getElement(), Position.AFTEREND);
render(tripControlsHeaderElements[1], filtersElement.getElement(), Position.AFTEREND);
render(tripInfoElement, info.getElement(), Position.AFTERBEGIN);
render(pageBodyContainer, statistics.getElement(), Position.BEFOREEND);

const onDataChange = (actionType, update) => {
  switch(actionType) {
    case `delete`:
      api.deletePoint({
        id: update.id
      })
        .then(() => api.getPoints())
        .then((points) => tripController.show(points));
      break;
    case `update`:
      api.updatePoint({
        id: update.id,
        data: update.toRAW()
      })
      .then(() => api.getPoints())
      .then((points) => tripController.show(points));
      break;
    case `create`:
      api.createPoint({
        data: update.toRAW()
      })
      .then(() => api.getPoints())
      .then((points) => tripController.show(points));
      break;
  }
};

api.getData({url: `destinations`})
  .then((destinations) => tripDestinations = destinations)
  .then(() => api.getData({url: `offers`}))
  .then((offers) => tripAdditionalOptions = offers)
  .then(() => api.getPoints())
  .then((points) => {
    tripController = new TripController(tripEventsElement, points, tripDestinations, tripAdditionalOptions, onDataChange);
  })
  .then(() => {
    tripController.init();
  });


menuElement.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `A`) {
    return;
  }

  evt.target.classList.add(`trip-tabs__btn--active`);

  switch (evt.target.id) {
    case `table-button`:
      statistics.hide();
      tripController.show();
      break;
    case `stats-button`:
      tripController.hide();
      statistics.show(points);
      break;
  }
});

eventAddButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  tripController.createPoint();
});

tripInfoCostValue.textContent = getTripCost(points);




