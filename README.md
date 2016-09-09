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

GoEuroClient.search(params)
  .then((response) => {
    console.log(response.queryId);
    console.log(response.parts);
  })
  .catch((error) => console.log(error));

```
