if(!('PORT' in process.env) || process.env.PORT.match(/^\d+$/) === null)
  throw new Error('PORT_ENV_VAR_REQUIRED')

var port = parseInt(process.env.PORT, 10);

var startServer = require('../');

exports.serverStartsAndStops = function(test) {
  test.expect(2);

  var mysqld = startServer({ port: port });

  mysqld.stderr.on('data', function (data) {
    var ready =
      data.toString().match(/port\: (\d+)\s+MySQL Community Server \(GPL\)/);

    if(ready !== null) {
      test.equal(port, parseInt(ready[1], 10));
//       mysqld.stop();
    }
  });

  mysqld.on('close', function (code) {
    test.ok(true);
    test.done();
  });
}
