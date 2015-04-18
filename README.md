# MySQL Server 5.6 for Linux x86 64-bit

Install and run [MySQL server](http://www.mysql.com) under the current user inside of the application directory.

MySQL requires `libaio`. To install on ubuntu, use the following command:

```
sudo apt-get install libaio1
```

Then you may install and use this package:

```
npm install mysql-server-5.6-linux-x86_64
```

Provides function for spawning MySQL server instance with optional configuration settings. Returns [`ChildProcess`](https://nodejs.org/api/child_process.html#child_process_class_childprocess).

* Only one instance may be spawned per application.
* `stop()` method added to returned `ChildProcess` instance to stop the server.

```javascript
var startMysql = require('mysql-server-5.6-linux-x86_64');

var mysqld = startMysql({ port: 3307 });

mysqld.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

mysqld.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

mysqld.on('close', function (code) {
  console.log('child process exited with code ' + code);
});

// Later on, stop server...
mysqld.stop();

```

See [`index.js`](index.js) for the default configuration options.

## License

GPLv2
