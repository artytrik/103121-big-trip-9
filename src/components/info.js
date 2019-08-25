import {createElement} from '../util.js';

export class Info {
  constructor({cities}) {
    this._cities = cities;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  getTemplate() {
    return `<div class="trip-info__main">
      <h1 class="trip-info__title">${this._cities.length > 3
      ? `${this._cities[0]}&mdash; ... &mdash;${this._cities[this._cities.length - 1]}`
      : `${this._cities.join(` &mdash; `)}`}</h1>
      <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
    </div>`;
  }
}
