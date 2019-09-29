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
  DATE_TIME: `DD/MM/YY HH:mm`,
  DATE_TIME_FLATPICKR: `d/m/y H:i`,
}

export const Key = {
  ENTER: `Enter`,
  ESCAPE_IE: `Escape`,
  ESCAPE: `Esc`,
}

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
  points.reduce((acc, {price, additionalOptions}) => {
    const additionalOptionsCost = additionalOptions.reduce((accc, {price, accepted}) =>
      (accepted ? accc + Number(price) : price), 0);
    return acc + Number(price) + additionalOptionsCost;
  }, 0)
);
