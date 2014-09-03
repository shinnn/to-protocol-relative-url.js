'use strict';

var spawn = require('child_process').spawn;

var test = require('tape');
var toProtocolRelativeUrl = require('require-main')();

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

test('"to-protocol-relative-url" command', function(t) {
  t.plan(7);

  var pkg = require('./package.json');

  var cmd = function(args) {
    return spawn('node', [pkg.bin].concat(args), {
      stdio: [process.stdin, null, null]
    });
  };
  var cmdPipe = function(args) {
    return spawn('node', [pkg.bin].concat(args), {
      stdio: ['pipe', null, null]
    });
  };

  cmd(['http://nodejs.org'])
  .stdout.on('data', function(data) {
    t.equal(data.toString(), '//nodejs.org\n', 'should change a URL into protocol-replative URL.');
  });

  cmd(['--help'])
  .stdout.on('data', function(data) {
    t.ok(/Usage/.test(data.toString()), 'should print help with `--help` flag.');
  });

  cmd(['--h'])
  .stdout.on('data', function(data) {
    t.ok(/Usage/.test(data.toString()), 'should accept `-h` alias.');
  });

  cmd(['--version'])
  .stdout.on('data', function(data) {
    t.equal(data.toString(), pkg.version + '\n', 'should print version with `--version` flag.');
  });

  cmd(['-v'])
  .stdout.on('data', function(data) {
    t.equal(data.toString(), pkg.version + '\n', 'should accept `-v` alias.');
  });

  cmd([])
  .stdout.on('data', function(data) {
    t.ok(/Usage/.test(data.toString()), 'should print help when URL isn\'t specified.');
  });

  t.test('"to-protocol-relative-url" command with pipe (`|`)', function(st) {
    st.plan(2);

    var cp = cmdPipe([]);
    cp.stdout.on('data', function(data) {
      st.equal(
        data.toString(), '//nodejs.org\n',
        'should change a URL into protocol-replative URL.'
      );
    });
    cp.stdin.write('http://nodejs.org');
    cp.stdin.end();

    var cpEmpty = cmdPipe([]);
    cpEmpty.stdout.on('data', function(data) {
      st.ok(/Usage/.test(data.toString()), 'should print help when stdin is empty.');
    });
    cpEmpty.stdin.write('');
    cpEmpty.stdin.end();
  });
});
