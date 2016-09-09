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
}
