import axios from 'axios';
import debug from 'debug';

const log = debug('roadie');

export default class Roadie {
  constructor({ environment, token }) {
    this.request = axios.create({
      baseURL: environment === 'production' ? 'https://connect.roadie.com' : 'https://connect-sandbox.roadie.com', // TODO: ensure production url is correct before go live
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async handleError(err) {
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      log('Error: response.data: %o', err.response.data);
      log('Error: response.status: %o', err.response.status);
      log('Error: response.headers: %o', err.response.headers);
      if (err.response.data && err.response.data.errors) {
        throw new Error(
          err.response.data.errors
            .map(error => {
              return `code: ${error.code} parameter: ${error.parameter} message: ${error.message}`;
            })
            .reduce((a, b) => {
              return `${a}\n${b}`;
            }, 'Roadie Error: '),
        );
      }
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      log('Error: err.request: %o', err.request);
      throw new Error(`Roadie Error: request: ${request.status}`)
    } else {
      // Something happened in setting up the request that triggered an err
      log('Error: %s', err.message);
      throw new Error(`Roadie Error: ${err.message}`)
    }
  }

  /**
   *
   * from https://docs.roadie.com/#create-a-shipment
   *
   * @param {Object} params
      reference_id (required)	string	The user supplied ID for the shipment. Max length 100 characters.
      items (required)	array	An array of one or more Item.
      pickup_location (required)	Location	A complete Location object.
      delivery_location (required)	Location	A complete Location object.
      pickup_after (required)	timestamp	The time when the shipment is ready for pickup.
      deliver_between (required)	TimeWindow	The window within which the shipment must be completed.
      options (required)	DeliveryOptions	Any delivery options for the shipment.
   * @param {function} cb
   */
  createShipment(params) {
    return this.request
      .post('/v1/shipments', params)
      .then(response => response.data)
      .catch(async err => this.handleError(err));
  }

  /**
   *
   * @param {Number} id (required)	string	id of previously created shipment
   */
  deleteShipment(id) {
    return this.request
      .delete(`/v1/shipments/${id}`)
      .then(response => response.data)
      .catch(async err => this.handleError(err));
  }

  /**
   *
   * from https://docs.roadie.com/#create-an-estimate
   *
   * @param {Object} params
      items (required)	array	An array of one or more Item.
      pickup_location (required)	Location	A Location object.
      delivery_location (required)	Location	A Location object.
      pickup_after (required)	timestamp	The time when the shipment is ready for pickup.
      deliver_between (required)	TimeWindow	The window within which the shipment must be completed.
   * @param {function} cb
   */
  estimate(params) {
    return this.request
      .post('/v1/estimates', params)
      .then(response => response.data)
      .catch(async err => this.handleError(err));
  }

  /**
   *
   * @param {Number} id (required)	string	id of previously created shipment
   */
  retrieveShipment(id) {
    return this.request
      .get(`/v1/shipments/${id}`)
      .then(response => response.data)
      .catch(async err => this.handleError(err));
  }

  /**
   *
   * @param {Number} id (required)	string	id of previously created shipment
   * @param {Object} params
      reference_id	string	The user supplied ID for the shipment.
      state	string	The current state of the shipment. See ShipmentState for all possible values.
      items	array	An array of one or more Item.
      pickup_location	Location	The address and contact info where the driver will pick up the shipment.
      delivery_location	Location	The address and contact info where the driver will deliver the shipment.
      pickup_after	timestamp	The time, in RFC 3339 format, after which the shipment is ready for pickup.
      deliver_between	TimeWindow	The window within which the shipment must be completed.
      options	DeliveryOptions	Any delivery options for the shipment.
      tracking_number	string	A unique number used to track the shipment.
      driver	Driver	The information about the assigned driver.
      created_at	timestamp	The time when the shipment was created in RFC 3339 format.
      updated_at	timestamp	The time when the shipment was last updated in RFC 3339 format.
   */
  updateShipment(id, params) {
    return this.request
      .patch(`/v1/shipments/${id}`, params)
      .then(response => response.data)
      .catch(async err => this.handleError(err));
  }
}
