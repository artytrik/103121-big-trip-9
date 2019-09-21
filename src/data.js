const getTripPoint = () => ({
  type: [
    `Bus`,
    `Check-in`,
    `Drive`,
    `Flight`,
    `Restaurant`,
    `Ship`,
    `Sightseeing`,
    `Taxi`,
    `Train`,
    `Transport`,
    `Trip`
  ][Math.floor(Math.random() * 11)],
  city: [
    `Moscow`,
    `Chita`,
    `Vladivostok`,
    `Khabarovsk`,
    `Murmansk`,
    `Sochi`
  ][Math.floor(Math.random() * 6)],
  photos: new Array(5).fill(`http://picsum.photos/300/150?r=${Math.random()}`),
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus`
  ][Math.floor(Math.random() * 11)],
  dateStart: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  dateFinish: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  price: Math.floor(Math.random() * 1000),
  additionalOptions: [
    {
      id: `event-offer-luggage`,
      name: `Add luggage`,
      adPrice: `10`,
      flag: true
    },
    {
      id: `event-offer-comfort`,
      name: `Switch to comfort class`,
      adPrice: `150`,
      flag: true
    },
    {
      id: `event-offer-meal`,
      name: `Add meal`,
      adPrice: `2`,
      flag: true
    },
    {
      id: `event-offer-seats`,
      name: `Choose seats`,
      adPrice: `9`,
      flag: true
    }
  ]
});

const filterTabs = [`everything`, `future`, `past`];
const sortTabs = [`day`, `event`, `time`, `price`, `offers`];

const getFilters = (element) => ({
  name: element
});

const getInfo = (points) => ({
  cities: points.map(({city}) => city)
});

export const points = new Array(3).fill(``).map(getTripPoint);
export const filters = filterTabs.map(getFilters);
export const infoElement = getInfo(points);
