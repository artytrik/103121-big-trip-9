import {Card} from '../components/card.js';
import {EditCard} from '../components/edit-card.js';
import {TripDays} from "../components/trip-days";
import {TripEvents} from "../components/trip-events";
import {EmptyResult} from "../components/empty-result";
import {render} from '../utils.js';
import {Position} from '../utils.js';
import {Day} from '../components/day.js';

export class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._tripDays = new TripDays();
    this._day = new Day();
    this._tripEvents = new TripEvents();
    this._emptyResult = new EmptyResult();
  }

  init() {
    render(this._container, this._tripDays.getElement(), Position.AFTEREND);
    render(this._tripDays.getElement(), this._day.getElement(), Position.AFTERBEGIN);
    render(this._day.getElement(), this._tripEvents.getElement(), Position.AFTERBEGIN);

    if (this._points.length > 0) {
      this._points.forEach((point) => this._renderPoints(point));
    } else {
      render(this._tripEvents.getElement(), this._emptyResult.getElement(), Position.BEFOREEND);
    }
  }

  _renderPoints(point) {
    const tripPoint = new Card(point);
    const editTripPoint = new EditCard();

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._tripEvents.getElement().replaceChild(tripPoint.getElement(), editTripPoint.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    tripPoint.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._tripEvents.getElement().replaceChild(editTripPoint.getElement(), tripPoint.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    editTripPoint.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, () => {
        this._tripEvents.getElement().replaceChild(tripPoint.getElement(), editTripPoint.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._tripEvents.getElement(), tripPoint.getElement(), Position.BEFOREEND);
  }
}
