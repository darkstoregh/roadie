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

var _axiosDebugLog = _interopRequireDefault(require("axios-debug-log"));

var _debug = _interopRequireDefault(require("debug"));

var log = (0, _debug["default"])('roadie');

var FedExAPI =
/*#__PURE__*/
function () {
  function FedExAPI(_ref) {
    var environment = _ref.environment,
        token = _ref.token;
    (0, _classCallCheck2["default"])(this, FedExAPI);
    this.request = _axios["default"].create({
      baseURL: environment === 'production' ? 'https://connect.roadie.com' : 'https://connect-sandbox.roadie.com',
      // TODO: ensure production url is correct before go live
      timeout: 3000,
      headers: {
        Authorization: "Bearer ".concat(token),
        'Content-Type': 'application/json'
      }
    });

    _axiosDebugLog["default"].addLogger(this.request, log);
  } // eslint-disable-next-line class-methods-use-this


  (0, _createClass2["default"])(FedExAPI, [{
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
                _context.next = 9;
                break;

              case 8:
                if (err.request) {
                  // The request was made but no response was received
                  // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                  log('Error: err.request: %o', err.request);
                } else {
                  // Something happened in setting up the request that triggered an err
                  log('Error: %s', err.message);
                }

              case 9:
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
      })["catch"](
      /*#__PURE__*/
      function () {
        var _ref2 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee2(err) {
          return _regenerator["default"].wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  return _context2.abrupt("return", _this.handleError(err));

                case 1:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
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
      })["catch"](
      /*#__PURE__*/
      function () {
        var _ref3 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee3(err) {
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt("return", _this2.handleError(err));

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
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
      })["catch"](
      /*#__PURE__*/
      function () {
        var _ref4 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee4(err) {
          return _regenerator["default"].wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  return _context4.abrupt("return", _this3.handleError(err));

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }());
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
      })["catch"](
      /*#__PURE__*/
      function () {
        var _ref5 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee5(err) {
          return _regenerator["default"].wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  return _context5.abrupt("return", _this4.handleError(err));

                case 1:
                case "end":
                  return _context5.stop();
              }
            }
          }, _callee5);
        }));

        return function (_x5) {
          return _ref5.apply(this, arguments);
        };
      }());
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
      })["catch"](
      /*#__PURE__*/
      function () {
        var _ref6 = (0, _asyncToGenerator2["default"])(
        /*#__PURE__*/
        _regenerator["default"].mark(function _callee6(err) {
          return _regenerator["default"].wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  return _context6.abrupt("return", _this5.handleError(err));

                case 1:
                case "end":
                  return _context6.stop();
              }
            }
          }, _callee6);
        }));

        return function (_x6) {
          return _ref6.apply(this, arguments);
        };
      }());
    }
  }]);
  return FedExAPI;
}();

exports["default"] = FedExAPI;
//# sourceMappingURL=index.js.map