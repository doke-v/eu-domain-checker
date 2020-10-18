Tool for checking `.eu` domain status (i.e availability) periodically via `eurid.eu` API.

## Installation

```
npm i eu-domain-checker
```
## Sample usage:  
Check domain availability every midnight until desired status (default: 'AVAILABLE') is met.
```js
const EuDomainChecker = require("eu-domain-checker");

const euridChecker = new EuDomainChecker('eurid.eu') //.eu is optional;

euridChecker
    .check() // using default options
    .then(console.log)
```
## Methods
```.check({status, cronExpression})``` -> ```Promise```
 * **status** *optional* `String` - Status to check against (one of: 'AVAILABLE', 'NOT_AVAILABLE', 'NOT_ALLOWED')  
Default value: ```'AVAILABLE'```
* **cronExpression** *optional* `String` - Standard cron expression for describing the desired schedule. This might be helpful: [crontab.guru](https://crontab.guru/). You can also check out [cron](https://www.npmjs.com/package/cron) package documentation.  
Default value: ```'0 0 * * *'```

```.checkOnce()``` -> ```Promise```  
*A single one time query to get domain status info (no scheduling).*
Example:
```js
 new EuDomainChecker('eurid.eu').checkOnce().then(console.log); 
/* {
  "name": "eurid.eu",
  "nameAscii": "eurid.eu",
  "status": "NOT_AVAILABLE",
  "lastModified": null
} */
```

```.isAvailable()``` -> ```Promise```  
*Same as checkOnce() but returns a boolean if promise resolves.*  
Example:
```js
 new EuDomainChecker('eurid.eu').isAvailable().then(console.log); // false
```