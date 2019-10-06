import moment from 'moment';

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const Mode = {
  ADDING: `adding`,
  DEFAULT: `default`,
};

export const DateFormat = {
  HOURS_MINUTES: `HH:mm`,
  YEAR_MONTH_DAY: `YYYY-MM-DD`,
  MONTH_DAY: `MMM DD`,
  DAY_MONTH: `DD MMM`,
  DATE_TIME: `DD/MM/YY HH:mm`,
  DATE_TIME_FLATPICKR: `d/m/y H:i`,
};

export const Key = {
  ENTER: `Enter`,
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
};

export const SortType = {
  EVENT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const FilterType = {
  EVERYTHING: `filter-everything`,
  FUTURE: `filter-future`,
  PAST: `filter-past`,
};

export const ActionType = {
  DELETE: `delete`,
  UPDATE: `update`,
  CREATE: `create`,
};

export const MAX_CITIES_LENGTH = 3;

export const TRANSPORT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
export const PLACE_TYPES = [`check-in`, `sightseeing`, `restaurant`];

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
    case Position.AFTEREND:
      container.after(element);
      break;
  }
};

export const unrender = (element) => {
  if (element) {
    element.remove();
  }
};

export const getTripCost = (points) => (
  points.reduce((acc, {basePrice, additionalOptions}) => {
    const additionalOptionsCost = additionalOptions.reduce((accc, {price, accepted}) =>
      (accepted ? accc + Number(price) : price), 0);
    return acc + Number(basePrice) + additionalOptionsCost;
  }, 0)
);

export const getInformation = (points) => {
  return {
    cities: points.map(({destination: {name}}) => name),
    dateStart: points[0].dateStart,
    dateFinish: points[points.length - 1].dateFinish
  };
};

export const transformFirstLetter = (string) => `${string[0].toUpperCase()}${string.substring(1)}`;

export const getTimeDifference = (dateStart, dateFinish) => {
  const diff = dateFinish - dateStart;
  const duration = moment.duration(diff);

  const minutesPart = `${String(duration.minutes()).padStart(2, `0`)}M`;
  const hoursPart = (duration.days() > 0 || duration.hours() > 0) ? `${String(duration.hours()).padStart(2, `0`)}H` : ``;
  const daysPart = duration.days() > 0 ? `${String(duration.days()).padStart(2, `0`)}D` : ``;

  return `${daysPart} ${hoursPart} ${minutesPart}`;
};
