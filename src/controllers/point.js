import {Position} from '../utils.js';
import {Card} from '../components/card.js';
import {EditCard} from '../components/edit-card.js';
import {render} from '../utils.js';

export class PointController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._pointView = new Card(data);
    this._pointEdit = new EditCard(data);

    this.init();
  }

  init() {
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        this._container.getElement().replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    this._pointView.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.getElement().replaceChild(this._pointEdit.getElement(), this._pointView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._pointEdit.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const formData = new FormData(this._pointEdit.getElement().querySelector(`.event--edit`));
        const additionalOptions = Array.from(this._pointEdit.getElement()
            .querySelectorAll(`.event__offer-selector`)).map((addOption) => {
          return ({
            id: addOption.querySelector(`.event__offer-checkbox`).name,
            name: addOption.querySelector(`.event__offer-title`).textContent,
            adPrice: addOption.querySelector(`.event__offer-price`).textContent,
            flag: addOption.querySelector(`.event__offer-checkbox`).checked
          });
        });

        const entry = {
          type: formData.get(`event-type`),
          city: formData.get(`event-destination`),
          dateStart: new Date(formData.get(`event__start-time`)),
          dateFinish: new Date(formData.get(`event__end-time`)),
          price: formData.get(`event-price`),
          additionalOptions
        };


        this._onDataChange(entry, this._data);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    render(this._container.getElement(), this._pointView.getElement(), Position.BEFOREEND);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._pointEdit.getElement())) {
      this._container.getElement().replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
    }
  }
}
