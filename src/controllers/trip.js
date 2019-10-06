import TripContainer from '../components/trip-container.js';
import CardsContainer from '../components/cards-container.js';
import DayInformation from '../components/day-information.js';
import EmptyResult from '../components/empty-result.js';
import Information from '../components/information.js';
import {render, unrender, Position, Mode as PointControllerMode, SortType, FilterType, getTripCost, getInformation} from '../utils.js';
import Day from '../components/day.js';
import Sort from '../components/sort.js';
import PointController from './point.js';
import moment from 'moment';

class TripController {
  constructor(container, points, destinations, additionalOptions, onDataChange) {
    this._container = container;
    this._points = points;
    this._tripContainer = new TripContainer();
    this._emptyResult = new EmptyResult();
    this._sort = new Sort();
    this._creatingPoint = null;
    this._destinations = destinations;
    this._additionalOptions = additionalOptions;
    this._onDataChangeServer = onDataChange;

    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  init() {
    render(this._container, this._sort.getElement(), Position.BEFOREEND);
    render(this._container, this._tripContainer.getElement(), Position.BEFOREEND);

    if (this._points.length > 0) {
      this._renderDays(this._points);
    } else {
      render(this._container.getElement(), this._emptyResult.getElement(), Position.BEFOREEND);
    }


    this._sort.getElement()
      .addEventListener(`change`, (evt) => this._onSortLinkClick(evt));

    const filterForm = document.querySelector(`.trip-filters`);
    filterForm.addEventListener(`change`, (evt) => this._onFilterClick(evt));

  }

  hide() {
    this._container.classList.add(`visually-hidden`);
  }

  show(points) {
    if (points !== this._points) {
      this._points = points;
      this._renderBoard();
    }

    this._container.classList.remove(`visually-hidden`);
  }

  createPoint() {
    if (this._creatingPoint) {
      return;
    }

    const defaultPoint = {
      type: `Taxi`,
      destination: {
        description: ``,
        pictures: [],
        name: ``,
      },
      dateStart: new Date(),
      dateFinish: new Date(),
      basePrice: 0,
      additionalOptions: [],
      isFavourite: false,
    };

    this._onChangeView();

    this._creatingPoint = new PointController(this._tripContainer,
        defaultPoint, PointControllerMode.ADDING, this._onDataChange, this._onChangeView, this._destinations, this._additionalOptions);
  }

  _renderBoard() {
    unrender(this._tripContainer.getElement());

    this._tripContainer.removeElement();
    this._subscriptions.length = 0;
    render(this._container, this._tripContainer.getElement(), Position.BEFOREEND);
    this._renderDays(this._points);
  }

  _renderPoints(container, point) {
    const pointController = new PointController(container,
        point, PointControllerMode.DEFAULT, this._onDataChange, this._onChangeView, this._destinations, this._additionalOptions);
    this._subscriptions.push(pointController.setDefaultView.bind(pointController));
  }

  _renderDays(points) {
    const sortedPoints = points.slice().sort((a, b) => a.dateStart - b.dateStart);
    const pointsByDate = new Map();
    sortedPoints.forEach((point) => {
      if (!pointsByDate.has(point.dateStart)) {
        pointsByDate.set(point.dateStart, []);
      }
      const arr = pointsByDate.get(point.dateStart);
      arr.push(point);
      pointsByDate.set(point.dateStart, arr);
    });

    let i = 1;

    pointsByDate.forEach((pointByDate, date) => {
      const objDate = new Date(date);
      const day = new Day();
      const dayInformation = new DayInformation(objDate, i);
      const cardsContainer = new CardsContainer();

      render(this._tripContainer.getElement(), day.getElement(), Position.BEFOREEND);
      render(day.getElement(), dayInformation.getElement(), Position.BEFOREEND);
      render(day.getElement(), cardsContainer.getElement(), Position.BEFOREEND);

      pointByDate.forEach((point) => this._renderPoints(cardsContainer, point));

      i++;
    });
  }

  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }

  _onDataChange(actionType, update, onError) {
    this._creatingPoint = null;
    this._onDataChangeServer(actionType, update, onError);
  }

  _renderBySort(sortedPoints) {
    const day = new Day();
    const dayInformation = new DayInformation();
    const cardsContainer = new CardsContainer();

    render(this._tripContainer.getElement(), day.getElement(), Position.BEFOREEND);
    render(day.getElement(), dayInformation.getElement(), Position.BEFOREEND);
    render(day.getElement(), cardsContainer.getElement(), Position.BEFOREEND);

    dayInformation.getElement().querySelector(`.day__counter`).textContent = ``;
    dayInformation.getElement().querySelector(`.day__date`).textContent = ``;
    dayInformation.getElement().querySelector(`.day__date`).value = ``;

    sortedPoints.forEach((point) => this._renderPoints(cardsContainer, point));
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();

    this._tripContainer.getElement().innerHTML = ``;

    switch (evt.target.dataset.sortType) {
      case SortType.EVENT:
        this._renderDays(this._points);
        break;
      case SortType.TIME:
        const sortedByTime = this._points.slice().sort((a, b) =>
          ((b.dateFinish - b.dateStart) - (a.dateFinish - a.dateStart)));
        this._renderBySort(sortedByTime);
        break;
      case SortType.PRICE:
        const sortedByPrice = this._points.slice().sort((a, b) => b.basePrice - a.basePrice);
        this._renderBySort(sortedByPrice);
        break;
    }
  }

  _onFilterClick(evt) {
    evt.preventDefault();

    this._tripContainer.getElement().innerHTML = ``;

    switch (evt.target.id) {
      case FilterType.EVERYTHING:
        this._renderDays(this._points);
        break;
      case FilterType.FUTURE:
        const filterFuturePoints = this._points.filter((point) => moment(point.dateStart).isAfter(new Date(Date.now())));
        this._renderDays(filterFuturePoints);
        break;
      case FilterType.PAST:
        const filterPastPoints = this._points.filter((point) => moment(point.dateFinish).isBefore(new Date(Date.now())));
        this._renderDays(filterPastPoints);
        break;
    }
  }

  updateData(points) {
    const informationParent = document.querySelector(`.trip-main__trip-info`);
    const tripCost = document.querySelector(`.trip-info__cost-value`);
    const informationContainer = document.querySelector(`.trip-info__main`);
    const sortedPoints = getInformation(points.slice().sort((a, b) => a.dateStart - b.dateFinish));
    const information = new Information(sortedPoints);

    informationParent.removeChild(informationContainer);
    render(informationParent, information.getElement(), Position.AFTERBEGIN);
    tripCost.textContent = getTripCost(points);
  }
}

export default TripController;
