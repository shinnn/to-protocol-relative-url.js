#!/usr/bin/env node
'use strict';

var argv = require('minimist')(process.argv.slice(2));
var pkg = require('./package.json');

function help() {
  var chalk = require('chalk');

  console.log([
    chalk.cyan(pkg.name) + chalk.gray(' v' + pkg.version),
    pkg.description,
    '',
    'Usage1: to-protocol-relative-url <string>',
    'Usage2: echo <string> | to-protocol-relative-url',
    '',
    'Options:',
    chalk.yellow('--help,    -h') + '  Print usage information',
    chalk.yellow('--version, -v') + '  Print version'
  ].join('\n'));
}

function run(url) {
  if (!url) {
    help();
    return;
  }

  url = '' + url;

  try {
    console.log(require('./to-protocol-relative-url-cjs.js')(url));
  } catch (e) {
    console.error(e);
  }
}

if (argv.version || argv.v) {
  console.log(pkg.version);
} else if (argv.help || argv.h) {
  help();
} else if (process.stdin.isTTY) {
  run(argv._[0]);
} else {
  require('get-stdin')(run);
}
