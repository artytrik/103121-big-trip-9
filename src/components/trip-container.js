import AbstractComponent from './abstract-component.js';

class TripContainer extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-days"></ul>`;
  }
}

export default TripContainer;
