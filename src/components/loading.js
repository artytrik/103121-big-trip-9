import AbstractComponent from "./abstract-component.js";

class Loading extends AbstractComponent {
  getTemplate() {
    return `<p class="trip-events__msg">Loading...</p>`;
  }
}

export default Loading;
