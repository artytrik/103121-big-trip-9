import {AbstractComponent} from './abstract-component.js';

export class TripEvents extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }
}
