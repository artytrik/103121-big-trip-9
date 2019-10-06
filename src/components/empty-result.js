import AbstractComponent from './abstract-component.js';

class EmptyResult extends AbstractComponent {
  getTemplate() {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
}

export default EmptyResult;
