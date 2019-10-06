import {Position, render, Mode, DateFormat, Key, TRANSPORT_TYPES, PLACE_TYPES} from '../utils.js';
import Card from '../components/card.js';
import EditCard from '../components/edit-card.js';
import moment from 'moment';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

class PointController {
  constructor(container, data, mode, onDataChange, onChangeView, destinations, additionalOptions) {
    this._container = container;
    console.log(this._container);
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._pointView = new Card(data, TRANSPORT_TYPES);
    this._pointEdit = new EditCard(data, destinations, TRANSPORT_TYPES, PLACE_TYPES, additionalOptions);
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
      if (evt.key === Key.ESCAPE_IE || evt.key === Key.ESCAPE) {
        if (this._pointEdit.getElement().parentElement === this._container) {
          this._container.replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
        }
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    flatpickr(this._pointEdit.getElement().querySelector(`#event-start-time-1`), {
      allowInput: false,
      defaultDate: moment(this._data.dateStart).format(DateFormat.DATE_TIME),
      dateFormat: `d/m/y H:i`,
      enableTime: true,
      time_24hr: true
    });

    flatpickr(this._pointEdit.getElement().querySelector(`#event-end-time-1`), {
      allowInput: false,
      defaultDate: moment(this._data.dateFinish).format(DateFormat.DATE_TIME),
      dateFormat: DateFormat.DATE_TIME_FLATPICKR,
      enableTime: true,
      time_24hr: true
    });

    this._pointView.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.getElement().replaceChild(this._pointEdit.getElement(), this._pointView.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    this._pointEdit.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, () => {
        this._container.getElement().replaceChild(this._pointView.getElement(), this._pointEdit.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._pointEdit.getElement()
      .querySelector(`.event__save-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this.block();

        this._onDataChange(mode === Mode.DEFAULT ? `update` : `create`, this._getNewData());

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    this._pointEdit.getElement().querySelector(`.event__reset-btn`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (mode === Mode.ADDING) {
          this._onDataChange(null, null);
        } else if (mode === Mode.DEFAULT) {
          this._onDataChange(`delete`, this._data);
        }
      });

    render(this._container.getElement(), currentView.getElement(), renderPosition);
  }

  _getNewData() {
    const formData = new FormData(this._pointEdit.getElement().querySelector(`.event--edit`));
    const addOptions = Array.from(this._pointEdit.getElement()
        .querySelectorAll(`.event__offer-selector`)).map((addOption) => {
      return ({
        title: addOption.querySelector(`.event__offer-title`).textContent,
        price: Number(addOption.querySelector(`.event__offer-price`).textContent),
        accepted: addOption.querySelector(`.event__offer-checkbox`).checked
      });
    });
    const destinationDescription = this._pointEdit.getElement().querySelector(`.event__destination-description`).textContent;
    const destinationPictures = Array.from(this._pointEdit.getElement().querySelectorAll(`.event__photo`)).map((picture) => ({
      src: picture.src,
      description: picture.alt
    }));

    const entry = {
      id: this._data.id,
      type: formData.get(`event-type`),
      destination: {
        name: formData.get(`event-destination`),
        description: destinationDescription,
        pictures: destinationPictures
      },
      dateStart: moment(formData.get(`event-start-time`), DateFormat.DATE_TIME).valueOf(),
      dateFinish: moment(formData.get(`event-end-time`), DateFormat.DATE_TIME).valueOf(),
      price: Number(formData.get(`event-price`)),
      additionalOptions: addOptions,
      isFavourite: Boolean(formData.get(`event-favorite`)),
      toRAW() {
        return {
          'id': this.id,
          'type': this.type,
          'destination': this.destination,
          'base_price': this.price,
          'date_from': this.dateStart,
          'date_to': this.dateFinish,
          'offers': this.additionalOptions,
          'is_favorite': this.isFavourite
        };
      }
    };
    return entry;
  };

  shake() {
    const ANIMATION_TIMEOUT = 600;
    this._pointEdit.getElement().style.animation = `shake ${ANIMATION_TIMEOUT / 1000}s`

    setTimeout(() => {
      this._pointEdit.getElement().style.animation = ``
    }, ANIMATION_TIMEOUT);
  }

  block() {
    const saveButton = this._pointEdit.getElement().querySelector(`.event__save-btn`);
    const deleteButton = this._pointEdit.getElement().querySelector(`.event__reset-btn`);

    saveButton.disabled = true;
    deleteButton.disabled = true;
  }

  setDefaultView() {
    if (this._container.getElement().contains(this._pointEdit.getElement())) {
      this._container.getElement().replaceChild(this._pointView.getElement(),
      this._pointEdit.getElement());
    }
  }
}

export default PointController;
