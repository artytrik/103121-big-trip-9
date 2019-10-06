import AbstractComponent from './abstract-component.js';

class CardsContainer extends AbstractComponent {
  getTemplate() {
    return `<ul class="trip-events__list"></ul>`;
  }
}

export default CardsContainer;
