# eu-domain-checker

Tool for checking `.eu` domain status (i.e availability) periodically via `eurid.eu` API.

## Installation

```
npm i eu-domain-checker
```

## Sample usage:

Check domain every midnight until desired status (default: 'AVAILABLE') is met.

```js
const EuDomainChecker = require('eu-domain-checker');

const exampleChecker = new EuDomainChecker('example.eu'); //.eu extension is optional;

exampleChecker
  .check() // using default options
  .then(console.log)
  .catch(console.error);
```

## API

`EuDomainChecker(domainName)`

- domainName _required_ `String` - Domain name to check. `.eu` extension is optional.

`.check({status, cronExpression})` -> `Promise`

- **status** _optional_ `String` - Status to check against (one of: 'AVAILABLE', 'NOT_AVAILABLE', 'NOT_ALLOWED')  
  Default value: `'AVAILABLE'`
- **cronExpression** _optional_ `String` - Standard cron expression for describing the desired schedule. This might be helpful: [crontab.guru](https://crontab.guru/). You can also check out [cron](https://www.npmjs.com/package/cron) package documentation.  
  Default value: `'0 0 * * *'` (every midnight)

`.checkOnce()` -> `Promise`  
_A single one time query to get domain status info (no scheduling)._  
Example:

```js
new EuDomainChecker('example.eu')
  .checkOnce()
  .then(console.log)
  .catch(console.error);
/* {
  "name": "example.eu",
  "nameAscii": "example.eu",
  "status": "NOT_AVAILABLE",
  "lastModified": null
} */
```

`.isAvailable()` -> `Promise`  
_Same as checkOnce() but returns a boolean if promise resolves._  
Example:

```js
new EuDomainChecker('example.eu')
  .isAvailable()
  .then(console.log)
  .catch(console.error); // false
```
