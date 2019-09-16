import {AbstractComponent} from './abstract-component.js';

export class DayInfo extends AbstractComponent {
  constructor(date, counter) {
    super();
    this._date = date;
    this._counter = counter;
  }

  getTemplate() {
    return `<div class="day__info">
      <span class="day__counter">${this._counter}</span>
      <time class="day__date" datetime="2019-03-18">${this._date.toDateString()}</time>
    </div>`;
  }
}
