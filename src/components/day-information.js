import AbstractComponent from './abstract-component.js';
import moment from 'moment';
import {DateFormat} from '../utils.js';

class DayInformation extends AbstractComponent {
  constructor(date, counter) {
    super();
    this._date = date;
    this._counter = counter;
  }

  getTemplate() {
    return `<div class="day__info">
      <span class="day__counter">${this._counter}</span>
      <time class="day__date" datetime="${moment(this._date)
        .format(DateFormat.YEAR_MONTH_DAY)}">${moment(this._date).format(DateFormat.MONTH_DAY)}</time>
    </div>`;
  }
}

export default DayInformation;
