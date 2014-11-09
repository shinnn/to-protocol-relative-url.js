'use strict';

var spawn = require('child_process').spawn;

var test = require('tape');
var toProtocolRelativeUrl = require('./');

var pkg = require('./package.json');

test('toProtocolRelativeUrl()', function(t) {
  t.plan(5);

  t.equal(
    toProtocolRelativeUrl('http://nodejs.org'), '//nodejs.org',
    'should change a URL into protocol-replative URL.'
  );
  t.equal(
    toProtocolRelativeUrl('http:://nodejs.org'), 'http:://nodejs.org',
    'should not change a invalid URL.'
  );
  t.equal(
    toProtocolRelativeUrl('git@github.com:npm/npm.git'), 'git@github.com:npm/npm.git',
    'should not change a non-URL string.'
  );
  t.equal(
    toProtocolRelativeUrl('Here is http://nodejs.org/.'), 'Here is http://nodejs.org/.',
    'should not change a string which doesn\'t begin with URL.'
  );
  t.throws(
    toProtocolRelativeUrl.bind(null, ['http://www.example.org/']),
    'should throw a type error when the argument is not a string.'
  );
  t.end();
});

test('"to-protocol-relative-url" command inside a TTY context', function(t) {
  t.plan(7);

  var cmd = function(args) {
    return spawn('node', [pkg.bin].concat(args), {
      stdio: [process.stdin, null, null]
    });
  };

  cmd(['http://json.org/'])
  .stdout.on('data', function(data) {
    t.equal(data.toString(), '//json.org/\n', 'should change a URL into protocol-replative URL.');
  });

  cmd(['100'])
  .on('close', function(code) {
    t.equal(code, 0, 'should not throw any errors even if it takes a number.');
  });

  cmd(['--help'])
  .stdout.on('data', function(data) {
    t.ok(/Usage/.test(data.toString()), 'should print help with `--help` flag.');
  });

  cmd(['--h'])
  .stdout.on('data', function(data) {
    t.ok(/Usage/.test(data.toString()), 'should use `-h` as an alias of `--help`.');
  });

  cmd(['--version'])
  .stdout.on('data', function(data) {
    t.equal(data.toString(), pkg.version + '\n', 'should print version with `--version` flag.');
  });

  cmd(['-v'])
  .stdout.on('data', function(data) {
    t.equal(data.toString(), pkg.version + '\n', 'should use `-v` as an alias of `--version`.');
  });

  cmd([])
  .stdout.on('data', function(data) {
    t.ok(/Usage/.test(data.toString()), 'should print help when URL isn\'t specified.');
  });
});

test('"to-protocol-relative-url" command  outside a TTY context', function(t) {
  t.plan(2);

  var cmdPipe = function(args) {
    return spawn('node', [pkg.bin].concat(args), {
      stdio: ['pipe', null, null]
    });
  };

  var cp = cmdPipe([]);
  cp.stdout.on('data', function(data) {
    t.equal(
      data.toString(), '//nodejs.org\n',
      'should change a URL into protocol-replative URL.'
    );
  });
  cp.stdin.write('http://nodejs.org');
  cp.stdin.end();

  var cpEmpty = cmdPipe([]);
  cpEmpty.stdout.on('data', function(data) {
    t.ok(/Usage/.test(data.toString()), 'should print help when stdin is empty.');
  });
  cpEmpty.stdin.write('');
  cpEmpty.stdin.end();
});
