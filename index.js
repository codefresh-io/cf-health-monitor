var express = require('express');
// var bodyParser = require('body-parser');
// app.use(bodyParser.json());

var consulMonitor = require('./ConsulMonitor');
var config = require('./config');

var app = express();
var router  = express.Router();
app.use('/', router);


router.get('/failed', function(req, res) {
    //getDockerInfo().then( dockerInfo => res.send(dockerInfo) );
    consulMonitor.getHealthStatus().done( healthStatus => res.send(healthStatus),
                                          err => {
                                              res.statusMessage = JSON.stringify(err);
                                              res.status(400).end()
                                          });
});


app.listen(config.servicePort);

