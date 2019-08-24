export const makeInfo = ({cities}) =>
  `<div class="trip-info__main">
    <h1 class="trip-info__title">${cities.length > 3
    ? `${cities[0]}&mdash; ... &mdash;${cities[cities.length - 1]}`
    : `${cities.join(` &mdash; `)}`}</h1>
    <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;21</p>
  </div>`;
