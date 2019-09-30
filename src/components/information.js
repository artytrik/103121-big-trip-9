import AbstractComponent from './abstract-component.js';
import moment from 'moment';
import {DateFormat} from '../utils.js';

class Information extends AbstractComponent {
  constructor({cities, dateStart, dateFinish}) {
    super();
    this._cities = cities;
    this._dateStart = dateStart;
    this._dateFinish = this._dateFinish;
    this._MAX_LENGTH = 3;
  }

  getTemplate() {
    return `<div class="trip-info__main">
    <h1 class="trip-info__title">${this._cities.length > this._MAX_LENGTH
    ? `${this._cities[0]}&mdash; ... &mdash;${this._cities[this._cities.length - 1]}`
    : `${this._cities.join(` &mdash; `)}`}</h1>
    <p class="trip-info__dates">${moment(this._dateStart).format(DateFormat.DAY_MONTH)}
      &nbsp;&mdash;&nbsp;${moment(this._dateEnd).format(DateFormat.DAY_MONTH)}</p>
    </div>`;
  }
}

export default Information;
