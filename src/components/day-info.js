import {AbstractComponent} from './abstract-component.js';
import moment from "moment";

export class DayInfo extends AbstractComponent {
  constructor(date, counter) {
    super();
    this._date = date;
    this._counter = counter;
  }

  getTemplate() {
    return `<div class="day__info">
      <span class="day__counter">${this._counter}</span>
      <time class="day__date" datetime="${moment(this._date)
        .format(`YYYY-MM-DD`)}">${moment(this._date).format(`MMM DD`)}</time>
    </div>`;
  }
}
