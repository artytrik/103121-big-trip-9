import {Position} from '../utils.js';
import {Card} from '../components/card.js';
import {EditCard} from '../components/edit-card.js';
import {render} from '../utils.js';
import moment from "moment";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
import {Mode} from '../utils.js';

export class PointController {
  constructor(container, data, mode, onDataChange, onChangeView, destinations) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._pointView = new Card(data);
    this._pointEdit = new EditCard(data, destinations);

    this.init(mode);
  }

  init(mode) {
    let renderPosition = Position.BEFOREEND;
    let currentView = this._pointView;

    if (mode === Mode.ADDING) {
      renderPosition = Position.AFTERBEGIN;
      currentView = this._pointEdit;
    }

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        if (mode === Mode.DEFAULT) {
          if (this._container.contains(this._pointEdit.getElement())) {
            this._container.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
          }
        } else if (mode === Mode.ADDING) {
          this._container.removeChild(currentView.getElement());
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    flatpickr(this._pointEdit.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: moment(this._data.dateStart).format(`DD/MM/YY HH:mm`),
      dateFormat: `d/m/y H:i`,
      enableTime: true
    });

    flatpickr(this._pointEdit.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: moment(this._data.dateFinish).format(`DD/MM/YY HH:mm`),
      dateFormat: `d/m/y H:i`,
      enableTime: true
    });

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
        const addOptions = Array.from(this._pointEdit.getElement()
            .querySelectorAll(`.event__offer-selector`)).map((addOption) => {
          return ({
            title: addOption.querySelector(`.event__offer-title`).textContent,
            price: addOption.querySelector(`.event__offer-price`).textContent,
            accepted: addOption.querySelector(`.event__offer-checkbox`).checked
          });
        });
        const destinationDescription = this._pointEdit.getElement().querySelector(`.event__destination-description`).textContent;
        const destinationPictures = Array.from(this._pointEdit.getElement().querySelectorAll(`.event__photo`)).map((picture) => ({
          src: picture.src,
          description: picture.alt
        }));

        const entry = {
          type: formData.get(`event-type`),
          destination: {
            name: formData.get(`event-destination`),
            description: destinationDescription,
            pictures: destinationPictures
          },
          dateStart: moment(formData.get(`event-start-time`), `DD/MM/YY HH:mm`).valueOf(),
          dateFinish: moment(formData.get(`event-end-time`), `DD/MM/YY HH:mm`).valueOf(),
          price: formData.get(`event-price`),
          additionalOptions: addOptions,
          isFavourite: Boolean(formData.get(`event-favourite`))
        };

        this._onDataChange(entry, mode === Mode.DEFAULT ? this._data : null);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._pointEdit.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, () => {
        this._onDataChange(null, this._data);
      });

    render(this._container.getElement(), currentView.getElement(), renderPosition);
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._pointEdit.getElement())) {
      this._container.getElement().replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
    }
  }
}
