import {TripDays} from "../components/trip-days";
import {TripEvents} from "../components/trip-events";
import {EmptyResult} from "../components/empty-result";
import {render} from '../utils.js';
import {unrender} from '../utils.js';
import {Position} from '../utils.js';
import {Day} from '../components/day.js';
import {Sort} from '../components/sort.js';
import {PointController} from './point.js';

export class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._tripDays = new TripDays();
    this._day = new Day();
    this._tripEvents = new TripEvents();
    this._emptyResult = new EmptyResult();
    this._sort = new Sort();

    this._subscriptions = [];
		this._onChangeView = this._onChangeView.bind(this);
		this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._tripDays.getElement(), this._day.getElement(), Position.BEFOREEND);
    render(this._day.getElement(), this._tripEvents.getElement(), Position.BEFOREEND);
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._tripDays.getElement(), Position.BEFOREEND);

    if (this._points.length > 0) {
      this._points.forEach((point) => this._renderPoints(point));
    } else {
      render(this._tripEvents.getElement(), this._emptyResult.getElement(), Position.BEFOREEND);
    }

    this._sort.getElement()
      .addEventListener(`change`, (evt) => this._onSortLinkClick(evt));
  }

  _renderBoard(points) {
    unrender(this._tripEvents.getElement());

    this._tripEvents.removeElement();
    render(this._day.getElement(), this._tripEvents.getElement(), Position.BEFOREEND);
    points.forEach((point) => this._renderPoints(point));
  }

  _renderPoints(point) {
    const pointController = new PointController(this._tripEvents, point, this._onDataChange, this._onChangeView);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    this._points[this._points.findIndex((it) => it === oldData)] = newData;

    this._renderBoard(this._points);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    this._tripEvents.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case `event`:
        this._points.forEach((point) => this._renderPoints(point));
        break;
      case `time`:
        const sortedByTime = this._points.slice().sort((a, b) => a.dueDate - b.dueDate);
        sortedByTime.forEach((point) => this._renderPoints(point));
        break;
      case `price`:
        const sortedByPrice = this._points.slice().sort((a, b) => a.price - b.price);
        sortedByPrice.forEach((point) => this._renderPoints(point));
        break;
    }
  }
}
