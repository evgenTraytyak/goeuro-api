'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _unirest = require('unirest');

var _unirest2 = _interopRequireDefault(_unirest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SEARCH_URL = 'http://www.goeuro.com/GoEuroAPI/rest/api/v3/search';
var RESULTS_URL = 'http://www.goeuro.com/GoEuroAPI/rest/api/v5/results';

var GoEuroAPI = function () {
  function GoEuroAPI() {
    _classCallCheck(this, GoEuroAPI);

    this.queryId = null;
    this.parts = null;
  }

  /**
   * @public
   * @param {Object} params - params for the search
   * @param {PositionObject} params.arrivalPosition
   * @param {('EUR'|'USD'|'GBP'|'CHF'|'PLN'|'CZK'|'SEK'|'CNY'|'RUB')} params.currency
   * @param {PositionObject} params.departurePosition
   * @param {('com'|'de'|'it'|'cz'|'nl'|'fr'|'se')} params.domain
   * @param {Date|null} params.inboundDate - date in YYYY-MM-DDT00:00:00.000 format
   * @param {'en'} params.locale
   * @param {Date|null} params.outboundDate - date in YYYY-MM-DDT00:00:00.000 format
   * @param {Object[]} params.passengers
   * @param {number} params.passengers[].age
   * @param {Array} params.passenger[].rebates
   * @param {Object} params.resultFormat
   * @param {Boolean} params.resultFormat.splitRoundTrip
   * @param {('directtrain'|'directbus'|'multimode')} params.searchModes
   * @return {Promise} - a promise that returns result of the search with queryId and parts
   */


  _createClass(GoEuroAPI, [{
    key: 'search',
    value: function search(params) {
      var _this = this;

      var request = _unirest2.default.post(SEARCH_URL).headers({ 'Content-Type': 'application/json; charset=UTF-8' }).send(params);

      return new Promise(function (resolve, reject) {
        request.end(function (response) {
          if (response.error) {
            console.error('Error when sending the request');
            reject(response.error);
          } else {
            _this.queryId = response.body.queryId;
            _this.parts = response.body.parts;

            resolve(response.body);
          }
        });
      });
    }
  }]);

  return GoEuroAPI;
}();

exports.default = GoEuroAPI;