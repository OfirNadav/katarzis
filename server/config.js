(function () {
    module.exports.getMongoUrl = function (){
        return 'mongodb://localhost:27017/katarzis';
    };

    module.exports.getServerPort = function(){
        return process.env.OPENSHIFT_NODEJS_PORT || 3000;
    };

    module.exports.getServerIp = function(){
        return process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
    };
})();
