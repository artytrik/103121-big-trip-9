import {AbstractComponent} from './abstract-component.js';

export class Card extends AbstractComponent {
  constructor({type, city, time, price, additionalOptions}) {
    super();
    this._type = type;
    this._city = city;
    this._time = new Date(time);
    this._price = price;
    this._additionalOptions = additionalOptions;
  }

  getTemplate() {
    return `<li class="trip-events__item">
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42"
        src="img/icons/${this._type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${this._type} to ${this._city}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="2019-03-18T10:30">
          ${this._time.toLocaleTimeString()}</time>
          &mdash;
          <time class="event__end-time" datetime="2019-03-18T11:00">
          ${this._time.toLocaleTimeString()}</time>
        </p>
        <p class="event__duration">1H 30M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${this._price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${this._additionalOptions.map(({name, price}) =>
    `<li class="event__offer">
      <span class="event__offer-title">${name}</span>
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
