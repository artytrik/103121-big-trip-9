import AbstractComponent from './abstract-component.js';

class Day extends AbstractComponent {
  getTemplate() {
    return `<li class="trip-days__item  day">
    </li>`;
  }
}

export default Day;
