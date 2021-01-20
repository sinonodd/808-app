const monk = require('monk');
const db = monk('localhost/808-app');

module.exports = db;
