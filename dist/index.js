"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var _debug = _interopRequireDefault(require("debug"));

var log = (0, _debug["default"])('roadie');

var Roadie =
/*#__PURE__*/
function () {
  function Roadie(_ref) {
    var environment = _ref.environment,
        token = _ref.token;
    (0, _classCallCheck2["default"])(this, Roadie);
    this.request = _axios["default"].create({
      baseURL: environment === 'production' ? 'https://connect.roadie.com' : 'https://connect-sandbox.roadie.com',
      // TODO: ensure production url is correct before go live
      headers: {
        Authorization: "Bearer ".concat(token),
        'Content-Type': 'application/json'
      }
    });
  } // eslint-disable-next-line class-methods-use-this


  (0, _createClass2["default"])(Roadie, [{
    key: "handleError",
    value: function () {
      var _handleError = (0, _asyncToGenerator2["default"])(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(err) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!err.response) {
                  _context.next = 8;
                  break;
                }

                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                log('Error: response.data: %o', err.response.data);
                log('Error: response.status: %o', err.response.status);
                log('Error: response.headers: %o', err.response.headers);

                if (!(err.response.data && err.response.data.errors)) {
                  _context.next = 6;
                  break;
                }

                throw new Error(err.response.data.errors.map(function (error) {
                  return "code: ".concat(error.code, " parameter: ").concat(error.parameter, " message: ").concat(error.message);
                }).reduce(function (a, b) {
                  return "".concat(a, "\n").concat(b);
                }, 'Roadie Error: '));

              case 6:
                _context.next = 15;
                break;

              case 8:
                if (!err.request) {
                  _context.next = 13;
                  break;
                }

                // The request was made but no response was received
                // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                log('Error: err.request: %o', err.request);
                throw new Error("Roadie Error: request: ".concat(err.request.status));

              case 13:
                // Something happened in setting up the request that triggered an err
                log('Error: %s', err.message);
                throw new Error("Roadie Error: ".concat(err.message));

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function handleError(_x) {
        return _handleError.apply(this, arguments);
      }

      return handleError;
    }()
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

  }, {
    key: "createShipment",
    value: function createShipment(params) {
      var _this = this;

      return this.request.post('/v1/shipments', params).then(function (response) {
        return response.data;
      })["catch"](function (err) {
        return _this.handleError(err);
      });
    }
    /**
     *
     * @param {Number} id (required)	string	id of previously created shipment
     */

  }, {
    key: "deleteShipment",
    value: function deleteShipment(id) {
      var _this2 = this;

      return this.request["delete"]("/v1/shipments/".concat(id)).then(function (response) {
        return response.data;
      })["catch"](function (err) {
        return _this2.handleError(err);
      });
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

  }, {
    key: "estimate",
    value: function estimate(params) {
      var _this3 = this;

      return this.request.post('/v1/estimates', params).then(function (response) {
        return response.data;
      })["catch"](function (err) {
        return _this3.handleError(err);
      });
    }
    /**
     *
     * @param {Number} id (required)	string	id of previously created shipment
     */

  }, {
    key: "retrieveShipment",
    value: function retrieveShipment(id) {
      var _this4 = this;

      return this.request.get("/v1/shipments/".concat(id)).then(function (response) {
        return response.data;
      })["catch"](function (err) {
        return _this4.handleError(err);
      });
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

  }, {
    key: "updateShipment",
    value: function updateShipment(id, params) {
      var _this5 = this;

      return this.request.patch("/v1/shipments/".concat(id), params).then(function (response) {
        return response.data;
      })["catch"](function (err) {
        return _this5.handleError(err);
      });
    }
  }]);
  return Roadie;
}();

exports["default"] = Roadie;
//# sourceMappingURL=index.js.map