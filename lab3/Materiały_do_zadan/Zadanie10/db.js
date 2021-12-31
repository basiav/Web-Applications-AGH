var firstRoute  = require('./produktyA.json');
var secondRoute = require('./produktyB.json');

module.exports = function() {
    return {
        produktyA  : firstRoute,
        produktyB : secondRoute
    }
}