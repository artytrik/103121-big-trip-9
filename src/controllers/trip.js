import {TripDays} from "../components/trip-days";
import {TripEvents} from "../components/trip-events";
import {DayInfo} from '../components/day-info.js';
import {EmptyResult} from "../components/empty-result";
import {render} from '../utils.js';
import {unrender} from '../utils.js';
import {Position} from '../utils.js';
import {Day} from '../components/day.js';
import {Sort} from '../components/sort.js';
import {PointController} from './point.js';
import {Mode as PointControllerMode} from '../utils.js';

export class TripController {
  constructor(container, points) {
    this._container = container;
    this._points = points;
    this._tripDays = new TripDays();
    this._emptyResult = new EmptyResult();
    this._sort = new Sort();

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._tripDays.getElement(), Position.BEFOREEND);

    if (this._points.length > 0) {
      this._renderDays(this._points);
    } else {
      render(this._container.getElement(), this._emptyResult.getElement(), Position.BEFOREEND);
    }

    this._sort.getElement()
      .addEventListener(`change`, (evt) => this._onSortLinkClick(evt));
  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  show() {
    this._container.classList.remove(`visually-hidden`);
  }

  createPoint() {
    const defaultPoint = {
      type: [`Bus`],
      city: [],
      photos: [],
      description: ``,
      dateStart: new Date(),
      dateFinish: new Date(),
      price: 0,
      additionalOptions: []
    };

    const pointController = new PointController(this._tripDays,
        defaultPoint, PointControllerMode.ADDING, this._onChangeView, this._onDataChange);
  }

  _renderBoard() {
    unrender(this._tripDays.getElement());

    this._tripDays.removeElement();
    render(this._container, this._tripDays.getElement(), Position.BEFOREEND);
    this._renderDays(this._points);
  }

  _renderPoints(container, point) {
    const pointController = new PointController(container,
        point, PointControllerMode.DEFAULT, this._onDataChange, this._onChangeView);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _renderDays(points) {
    const sortedPoints = points.slice().sort((a, b) => a.dateStart - b.dateStart);
    let pointsByDate = new Map();
    sortedPoints.forEach((point) => {
      if (!pointsByDate.has(point.dateStart)) {
        pointsByDate.set(point.dateStart, []);
      }
      let arr = pointsByDate.get(point.dateStart);
      arr.push(point);
      pointsByDate.set(point.dateStart, arr);
    });

    let i = 1;

    pointsByDate.forEach((pointByDate, date) => {
      const objDate = new Date(date);
      const day = new Day();
      const dayInfo = new DayInfo(objDate, i);
      const tripEvents = new TripEvents();

      render(this._tripDays.getElement(), day.getElement(), Position.BEFOREEND);
      render(day.getElement(), dayInfo.getElement(), Position.BEFOREEND);
      render(day.getElement(), tripEvents.getElement(), Position.BEFOREEND);

      pointByDate.forEach((point) => this._renderPoints(tripEvents, point));

      i++;
    });
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(newData, oldData) {
    const index = this._points.findIndex((it) => it === oldData);

    if (newData === null) {
      this._points = [...this._points.slice(0, index), ...this._points.slice(index + 1)];
    } else {
      this._points[index] = newData;
    }

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
