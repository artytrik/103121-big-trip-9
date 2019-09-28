class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.destination = data[`destination`];
    this.price = data[`base_price`];
    this.dateStart = new Date(data[`date_from`]);
    this.dateFinish = new Date(data[`date_to`]);
    this.additionalOptions = data[`offers`] || [];
    this.isFavourite = Boolean(data[`is_favourite`]);
  }

  static parsePoint(data) {
    return new ModelPoint(data);
  }

  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
};

export default ModelPoint;
