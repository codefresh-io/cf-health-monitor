/**
 * Default config file for local env - to be replaces by configuration manager
 */

var config = {
    consul: {
        host: 'consul',
        port: '8500',
        aclToken: ''
    },

    servicePort: '5999'
};

module.exports = config;
