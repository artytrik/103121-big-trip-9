import {Menu} from './components/menu.js';
import {Info} from './components/info.js';
import {Filters} from './components/filters.js';
import {CardContainer} from './components/card-container.js';
import {Card} from './components/card.js';
import {EditCard} from './components/edit-card.js';
import {points} from './data.js';
import {menuElements} from './data.js';
import {filters} from './data.js';
import {infoElement} from './data.js';
import {render} from './util.js';
import {Position} from './util.js';

const tripMainElement = document.querySelector(`.trip-main`);
const tripInfoElement = tripMainElement.querySelector(`.trip-info`);
const tripControlsElement = tripMainElement.querySelector(`.trip-controls`);
const tripControlsHeaderElements = tripControlsElement.querySelectorAll(`h2`);
const pageMainElement = document.querySelector(`.page-main`);
const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
const tripInfoCostValue = tripInfoElement.querySelector(`.trip-info__cost-value`);

const cardContainer = new CardContainer();
const info = new Info(infoElement);
const filtersElement = new Filters(filters);
const menuElement = new Menu(menuElements);

render(tripControlsHeaderElements[0], menuElement.getElement(), Position.AFTEREND);
render(tripControlsHeaderElements[1], filtersElement.getElement(), Position.AFTEREND);
render(tripInfoElement, info.getElement(), Position.AFTERBEGIN);
render(tripEventsElement, cardContainer.getElement(), Position.AFTEREND);

const tripEventsListElement = document.querySelector(`.trip-events__list`);
console.log(tripEventsListElement);


const renderPoints = (point) => {
  const tripPoint = new Card(point);
  const editTripPoint = new EditCard();

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      tripEventsListElement.replaceChild(tripPoint.getElement(), editTripPoint.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  tripPoint.getElement()
    .querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, () => {
      tripEventsListElement.replaceChild(editTripPoint.getElement(), tripPoint.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });

  editTripPoint.getElement()
    .querySelector(`.event__save-btn`)
    .addEventListener(`click`, () => {
      tripEventsListElement.replaceChild(tripPoint.getElement(), editTripPoint.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

  render(tripEventsListElement, tripPoint.getElement(), Position.BEFOREEND);
}

points.forEach((point) => renderPoints(point));
