module.exports = function(app){
    app.post('/api/helloworld', function (req, res) {
        var self = this;

        res.send({
            response: "hello world"
        });
    });
};