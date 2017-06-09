const UntappdClient = require('./lib/untappd-client');
const _ = require('lodash');

const untappdClient = new UntappdClient('', '');

untappdClient.getUserInfo({username: 'cluebat'})
.then((result) => {
  const response = JSON.parse(_.get(result, 'body', ''));
  console.log(_.get(response, 'response', {}));
})
.catch((err) => {
  console.log('error');
  console.log(err);
});

module.exports.UntappdClient = require('./lib/untappd-client');
