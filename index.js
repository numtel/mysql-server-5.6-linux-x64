var fs = require('fs');
var path = require('path');
var spawn = require('child_process').spawn;
var extend = require('extend');

var defaultConfig = {
  port                    : 3306,
  // Binary log settings
  server_id               : 1,
  binlog_format           : 'row',
  log_bin                 : '../../binlog/mysql-bin.log',
  binlog_checksum         : 'CRC32',
  expire_logs_days        : 10,
  max_binlog_size         : '100M',
  // Settings related to this package's directory structure
  // tmpdir set in server/start.sh
  basedir                 : './',
  datadir                 : './data/mysql',
  socket                  : './mysql.sock',
  pid_file                : './mysql.pid',
  // Other settings
  innodb_buffer_pool_size : '128M',
  expire_logs_days        : '10',
  sql_mode                : 'NO_ENGINE_SUBSTITUTION,STRICT_TRANS_TABLES',
}

// Start the MySQL server, optionally specifying options for my.cnf
module.exports = function(config) {
  var fullConfig = extend(defaultConfig, config || {});

  // Generate my.cnf from provided configuration
  var myCnf = '[mysqld]\n' +
    Object.keys(fullConfig).map(function(key) {
      if(fullConfig[key] === null || fullConfig[key] === undefined) {
        return ''
      } else {
        return key + ' = ' + fullConfig[key]
      }
    }).join('\n');

  fs.writeFileSync(path.join(__dirname, 'server/my.cnf'), myCnf);

  // Did not work spawning mysqld directly from node, therefore shell script
  var child = spawn(path.join(__dirname, 'server/start.sh'));
  
  // Server pid is different than the spawned child pid becuase of shell script
  // Provide extra method on child process to stop the server
  child.stop = function() {
    var pidFile = path.join(__dirname, 'server', fullConfig.pid_file);
    var pid = parseInt(fs.readFileSync(pidFile), 10);
    process.kill(pid);
  };

  return child
}


