var Q = require('q');
var config = require('./config');

var fromCallback = function (fn) {
    var deferred = Q.defer();
    fn(function (err, data) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};
var consul       = require('consul')({
                                         host: config.consul.host,
                                         port: config.consul.port,
                                         promisify: fromCallback
                                     });

function getHealthStatus(){
    return consul.health.state({state: 'critical'})
    .then(failedServices => {
        if (failedServices.length === 0 ){
            return Q.resolve("All Services are running normally");
        }
        else {
            return Q.reject(failedServices.map(c => `${c.Node} - ${c.CheckID} - ${c.Status}: ${c.Output} `));
        }
    });
}

module.exports.getHealthStatus = getHealthStatus;