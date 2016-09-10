GoEuro API
==========

[GoEuro](http://www.goeuro.com/) API for Node.js.

## Installation

```javascript
npm install goeuro-api --save
```

## How to use

```javascript
import GoEuroAPI from 'goeuro-api';
const GoEuroClient = new GoEuroAPI();

// Init the search and get flights, trains and buses.
GoEuroClient.search(params)
  .then((response) => {
    GoEuroClient.flights()
      .then(flights => console.log(flights));

    GoEuroClient.trains()
      .then(trains => console.log(trains));

    GoEuroClient.buses()
      .then(buses => console.log(buses));
  })
  .catch((error) => console.log(error));

// Get buses by search_id
GoEuroClient
  .buses({ search_id: id })
  .then(buses => console.log(buses))
  .catch(error => console.log(error));
```
