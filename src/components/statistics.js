import AbstractComponent from './abstract-component.js';
import Chart from 'chart.js';
import moment from 'moment';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TRANSPORT_TYPES} from '../utils.js';

class Statistics extends AbstractComponent {
  constructor() {
    super();

    this._moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    this._transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    this._timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);
  }

  getTemplate() {
    return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
  }

  hide() {
    this.getElement().classList.add(`visually-hidden`);
    this._clearStat(this._moneyStat, this._transportStat, this._timeSpendStat);
  }

  show(points) {
    this.getElement().classList.remove(`visually-hidden`);

    this._points = points;

    this._renderMoneyStat();
    this._renderTransportStat();
    this._renderTimeSpendStat();
  }

  _renderStat(name, container, labels, data) {
    return new Chart(container, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `white`,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            anchor: `end`,
            align: `start`,
            padding: 5,
          }
        },
        title: {
          display: true,
          text: name,
          position: `left`,
          fontSize: 30,
          fontColor: `black`
        },
        scales: {
          yAxes: [{
            categoryPercentage: 1,
            barPercentage: 0.8,
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }]
        },
        legend: {
          display: false,
        },
      }
    });
  }

  _renderMoneyStat() {
    const moneyLabels = [...new Set(this._points.map(({type}) => type))];
    const moneyData = moneyLabels.reduce((acc, label) => {
      const labelPrice = this._points.reduce((sum, {basePrice, type}) => {
        if (type === label) {
          sum += Number(basePrice)
        }
        return sum;
      }, 0);
      acc.push(labelPrice);
      return acc;
    }, []);
    this._moneyStat = this._renderStat(`MONEY`, this._moneyCtx, moneyLabels, moneyData);
  }

  _renderTransportStat() {
    const transportLabels = [...new Set(this._points.map(({type}) => type)
        .filter((type) => TRANSPORT_TYPES.includes(type)))];
    const transportData = transportLabels.reduce((acc, label) => {
      const transportNumber = this._points.filter(({type}) => type === label).length;
      acc.push(transportNumber);
      return acc;
    }, []);

    this._transportStat = this._renderStat(`TRANSPORT`, this._transportCtx, transportLabels, transportData);
  }

  _renderTimeSpendStat() {
    const timeSpendLabels = [...new Set(this._points.map(({type}) => type))];
    const timeSpendData = timeSpendLabels.reduce((acc, label) => {
      const labelTime = this._points.reduce((sum, {dateStart, dateFinish, type}) => {
        if (type === label) {
          sum += (dateFinish - dateStart)
        }
        return sum;
      }, 0);
      const hoursCount = Math.floor(moment.duration(labelTime).asHours());
      acc.push(hoursCount);
      return acc;
    }, []);

    this._timeSpendStat = this._renderStat(`TIME SPEND`, this._timeSpendCtx, timeSpendLabels, timeSpendData);
  }

  _clearStat(...stats) {
    stats.forEach((stat) => {
      if (stat) {
        stat.destroy();
      }
    });
  }
}

export default Statistics;
