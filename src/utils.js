export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

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
    const additionalOptionsCost = additionalOptions.reduce((accc, {adPrice, flag}) =>
      (flag ? accc + Number(adPrice) : adPrice), 0);
    return acc + Number(price) + additionalOptionsCost;
  }, 0)
);
