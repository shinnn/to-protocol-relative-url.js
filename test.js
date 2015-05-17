'use strict';

const spawn = require('child_process').spawn;

const test = require('tape');
const toProtocolRelativeUrl = require('.');

const pkg = require('./package.json');

test('toProtocolRelativeUrl()', t => {
  t.plan(6);

  t.equal(toProtocolRelativeUrl.name, 'toProtocolRelativeUrl', 'should have a function name.');

  t.equal(
    toProtocolRelativeUrl('http://nodejs.org'),
    '//nodejs.org',
    'should change a URL into protocol-replative URL.'
  );
  t.equal(
    toProtocolRelativeUrl('http:://nodejs.org'),
    'http:://nodejs.org',
    'should not change a invalid URL.'
  );
  t.equal(
    toProtocolRelativeUrl('git@github.com:npm/npm.git'),
    'git@github.com:npm/npm.git',
    'should not change a non-URL string.'
  );
  t.equal(
    toProtocolRelativeUrl('Here is http://nodejs.org/.'),
    'Here is http://nodejs.org/.',
    'should not change a string which doesn\'t begin with URL.'
  );
  t.throws(
    () => toProtocolRelativeUrl(['http://www.example.org/']),
    /TypeError.* is not a string\. Argument to to-protocol-relative-url must be a URL\./,
    'should throw a type error when the argument is not a string.'
  );
  t.end();
});

test('"to-protocol-relative-url" command inside a TTY context', t => {
  t.plan(7);

  var cmd = args => {
    return spawn('node', [pkg.bin].concat(args), {
      stdio: [process.stdin, null, null]
    });
  };

  cmd(['http://json.org/'])
  .stdout.on('data', data => {
    t.equal(String(data), '//json.org/\n', 'should change a URL into protocol-replative URL.');
  });

  cmd(['100'])
  .on('close', code => {
    t.equal(code, 0, 'should not throw any errors even if it takes a number.');
  });

  cmd(['--help'])
  .stdout.on('data', data => {
    t.ok(/Usage/.test(String(data)), 'should print help with `--help` flag.');
  });

  cmd(['--h'])
  .stdout.on('data', data => {
    t.ok(/Usage/.test(String(data)), 'should use `-h` as an alias of `--help`.');
  });

  cmd(['--version'])
  .stdout.on('data', data => {
    t.equal(String(data), pkg.version + '\n', 'should print version with `--version` flag.');
  });

  cmd(['-v'])
  .stdout.on('data', data => {
    t.equal(String(data), pkg.version + '\n', 'should use `-v` as an alias of `--version`.');
  });

  cmd([])
  .stdout.on('data', data => {
    t.ok(/Usage/.test(data.toString()), 'should print help when URL isn\'t specified.');
  });
});

test('"to-protocol-relative-url" command  outside a TTY context', t => {
  t.plan(2);

  var cmdPipe = args => {
    return spawn('node', [pkg.bin].concat(args), {
      stdio: ['pipe', null, null]
    });
  };

  var cp = cmdPipe([]);
  cp.stdout.on('data', data => {
    t.equal(String(data), '//nodejs.org\n', 'should change a URL into protocol-replative URL.');
  });
  cp.stdin.end('http://nodejs.org');

  var cpEmpty = cmdPipe([]);
  cpEmpty.stdout.on('data', data => {
    t.ok(/Usage/.test(String(data)), 'should print help when stdin is empty.');
  });
  cpEmpty.stdin.end('');
});
