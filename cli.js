#!/usr/bin/env node
'use strict';

var argv = require('minimist')(process.argv.slice(2), {
  alias: {
    h: 'help',
    v: 'version'
  },
  string: ['_'],
  boolean: ['help', 'version']
});

function help() {
  var sumUp = require('sum-up');
  var yellow = require('chalk').yellow;

  var pkg = require('./package.json');

  console.log([
    sumUp(pkg),
    '',
    'Usage1: to-protocol-relative-url <string>',
    'Usage2: echo <string> | to-protocol-relative-url',
    '',
    'Options:',
    yellow('--help,    -h') + '  Print usage information',
    yellow('--version, -v') + '  Print version'
  ].join('\n'));
}

function run(url) {
  if (!url) {
    help();
    return;
  }

  console.log(require('./to-protocol-relative-url-cjs.js')(url));
}

if (argv.version) {
  console.log(require('./package.json').version);
} else if (argv.help) {
  help();
} else if (process.stdin.isTTY) {
  run(argv._[0]);
} else {
  require('get-stdin')(run);
}
