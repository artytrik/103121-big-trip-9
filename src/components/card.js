import AbstractComponent from './abstract-component.js';
import moment from 'moment';
import {DateFormat, transformFirstLetter, getTimeDifference, TRANSPORT_TYPES} from '../utils.js';

class Card extends AbstractComponent {
  constructor({type, destination: {name}, dateStart, dateFinish, price, additionalOptions, id}, transportTypes) {
    super();
    this._type = type;
    this._city = name;
    this._dateStart = new Date(dateStart);
    this._dateFinish = new Date(dateFinish);
    this._price = price;
    this._additionalOptions = additionalOptions;
    this._id = id;
  }

  getTemplate() {
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42"
        src="img/icons/${this._type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${transformFirstLetter(this._type)}
        ${TRANSPORT_TYPES.includes(this._type) ? `to` : `in`}
      ${this._city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${moment(this._dateStart)
            .format(DateFormat.YEAR_MONTH_DAY)}T${moment(this._dateStart).format(DateFormat.HOURS_MINUTES)}">
          ${moment(this._dateStart).format(DateFormat.HOURS_MINUTES)}</time>
          &mdash;
          <time class="event__end-time" datetime="${moment(this._dateFinish)
            .format(DateFormat.YEAR_MONTH_DAY)}T${moment(this._dateFinish).format(DateFormat.YEAR_MONTH_DAY)}">
          ${moment(this._dateFinish).format(DateFormat.HOURS_MINUTES)}</time>
        </p>
        <p class="event__duration">${getTimeDifference(this._dateStart, this._dateFinish)}</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${this._price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${this._additionalOptions.filter(({accepted}) => accepted).map(({title, price}) =>
    `<li class="event__offer">
      <span class="event__offer-title">${title}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`).join(``)}
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
  }
}

export default Card;
