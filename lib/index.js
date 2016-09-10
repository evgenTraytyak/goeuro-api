import unirest from 'unirest';

const SEARCH_URL = 'http://www.goeuro.com/GoEuroAPI/rest/api/v3/search';
const RESULTS_URL = 'http://www.goeuro.com/GoEuroAPI/rest/api/v5/results';

export default class GoEuroAPI {
  constructor() {
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
  search(params) {
    const request = unirest
      .post(SEARCH_URL)
      .headers({ 'Content-Type': 'application/json; charset=UTF-8' })
      .send(params);

    return new Promise((resolve, reject) => {
      request.end(response => {
        if (response.error) {
          console.error('Error when sending the request');
          reject(response.error);
        } else {
          this.queryId = response.body.queryId;
          this.parts = response.body.parts;

          resolve(response.body);
        }
      });
    });
  }

  /**
   * @private
   * @param {Object} params - params for getting the request data
   * @param {Number} params.search_id
   * @param {String} [params.direction='outbound']
   * @param {String} [params.segment_info='none']
   * @param {String[]} params.sort_variants - 'price', 'traveltime', 'outboundDepartureTime', 'outboundArrivalTime', 'smart'
   * @param {String} [params.sort_by='updateTime']
   * @param {Number} [params.limit=50]
   * @param {String[]} params.segment_types - 'train', 'bus', 'flight', 'publictransp'
   * @param {Number} [params.price_from=1]
   * @param {Boolean} [params.include_transit=true]
   * @return {Promise} - a promise that returns response data
   */
  _request(params) {
    const defaultParams = {
      search_id: this.queryId,
      direction: 'outbound',
      segment_info: 'none',
      updated_since: 0,
      sort_by: 'updateTime',
      limit: 50,
      price_from: 1,
      include_transit: true
    };

    const request = unirest
      .get(RESULTS_URL)
      .headers({ 'Content-Type': 'application/json; charset=UTF-8' })
      .query(Object.assign(defaultParams, params));

    return new Promise((resolve, reject) => {
      request.end(response => {
        if (response.error) {
          reject(response.error);
        } else {
          resolve(response.body);
        }
      });
    });
  }

  /**
   * @public
   * @param {Object} params - params for flights search
   */
  flights(params) {
    return this._request(Object.assign({}, params, { travel_mode: 'flight' }));
  }

  /**
   * @public
   * @param {Object} params - params for buses search
   */
  buses(params) {
    return this._request(Object.assign({}, params, { travel_mode: 'bus' }));
  }

  /**
   * @public
   * @param {Object} params - params for trains search
   */
  trains(params) {
    return this._request(Object.assign({}, params, { travel_mode: 'train' }));
  }
}
