import Menu from './components/menu.js';
import Information from './components/information.js';
import Filters from './components/filters.js';
import {render, Position, getTripCost, ActionType, getInformation} from './utils.js';
import TripController from './controllers/trip.js';
import Statistics from './components/statistics.js';
import API from './api.js';

const FILTER_TABS = [`everything`, `future`, `past`];
const AUTHORIZATION = `Basic eo0w590ik29889a=${Math.random()}`;
const END_POINT = `https://htmlacademy-es-9.appspot.com/big-trip/`;

const tripMainElement = document.querySelector(`.trip-main`);
const tripInformationElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsHeaderElements = tripControlsElement.querySelectorAll(`h2`);
const pageMainElement = document.querySelector(`.page-main`);
const pageBodyContainer = pageMainElement.querySelector(`.page-body__container`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const tripCostValue = tripInformationElement.querySelector(`.trip-info__cost-value`);
const eventAddButton = tripMainElement.querySelector(`.trip-main__event-add-btn`);

let tripController;
let tripDestinations;
let tripAdditionalOptions;
let pointsData;
let information;
let pointsInformation;
const filtersElement = new Filters(FILTER_TABS);
const menuElement = new Menu();
const statistics = new Statistics();
const api = new API({endPoint: END_POINT, authorization: AUTHORIZATION});
statistics.getElement().classList.add(`visually-hidden`);

render(tripControlsHeaderElements[0], menuElement.getElement(), Position.AFTEREND);
render(tripControlsHeaderElements[1], filtersElement.getElement(), Position.AFTEREND);
render(pageBodyContainer, statistics.getElement(), Position.BEFOREEND);

const onDataChange = (actionType, update) => {
  switch(actionType) {
    case ActionType.DELETE:
      api.deletePoint({
        id: update.id
      })
        .then(() => api.getPoints())
        .then((points) => tripController.show(points));
      break;
    case ActionType.UPDATE:
      api.updatePoint({
        id: update.id,
        data: update.toRAW()
      })
      .then(() => api.getPoints())
      .then((points) => tripController.show(points));
      break;
    case ActionType.CREATE:
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
    pointsData = points;
    pointsInformation = getInformation(points.slice().sort((a,b) => a - b));
  })
  .then(() => {
    tripController = new TripController(tripEventsElement, pointsData, tripDestinations, tripAdditionalOptions, onDataChange);
    information = new Information(pointsInformation);
  })
  .then(() => {
    tripController.init();
    render(tripInformationElement, information.getElement(), Position.AFTERBEGIN);
    tripCostValue.textContent = getTripCost(pointsData);
  });


menuElement.getElement().addEventListener(`click`, (evt) => {
  evt.preventDefault();

  if (evt.target.tagName !== `A`) {
    return;
  }

  evt.target.classList.add(`trip-tabs__btn--active`);

  if (evt.target.previousElementSibling) {
    evt.target.previousElementSibling.classList.remove(`trip-tabs__btn--active`);
  } else {
    evt.target.nextElementSibling.classList.remove(`trip-tabs__btn--active`);
  }

  switch (evt.target.id) {
    case `table-button`:
      statistics.hide();
      tripController.show(pointsData);
      break;
    case `stats-button`:
      tripController.hide();
      statistics.show(pointsData);
      break;
  }
});

eventAddButton.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  tripController.createPoint();
});
