var db = require('./db.js');
var express = require('express');
var app = express();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/measurdata/:id', function (req, res) {

    db.querySql("select dataid, emg, pressure from MeasurData where id = @id and finalok = 1 order by dataid",
    {id:req.params.id},function(err, result){
        res.json(result.recordset);
    });
})

var server = app.listen(18088, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("http://%s:%s", host, port)

})