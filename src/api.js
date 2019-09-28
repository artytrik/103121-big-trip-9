import ModelPoint from './model-point.js';

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => {
  return response.json();
}

class API {
  constructor({endPoint, authorization}) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getData({url}) {
    return this._load({url})
      .then(toJSON);
  }

  getPoints() {
    return this._load({url: `points`})
      .then(toJSON)
      .then(ModelPoint.parsePoints);
  }

  createPoint({point}) {

  }

  updatePoint({id, data}) {

  }

  deletePoint({id}) {
    return this._load({url: `poins/${id}`, method: Method.DELETE});
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()})
    {
      headers.append(`Authorization`, this._authorization);

      return fetch(`${this._endPoint}/${url}`, {method, body, headers})
        .then(checkStatus)
        .catch((err) => {
          console.error(`fetch error: ${err}`);
          throw err;
        });
    }
};

export default API;
