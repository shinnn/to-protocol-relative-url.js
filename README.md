# to-protocol-relative-url.js

[![NPM version](https://img.shields.io/npm/v/to-protocol-relative-url.svg)](https://www.npmjs.com/package/to-protocol-relative-url)
[![Bower version](https://img.shields.io/bower/v/to-protocol-relative-url.svg)](https://github.com/shinnn/to-protocol-relative-url.js/releases)
[![Build Status](https://travis-ci.org/shinnn/to-protocol-relative-url.js.svg?branch=master)](https://travis-ci.org/shinnn/to-protocol-relative-url.js)
[![Build status](https://ci.appveyor.com/api/projects/status/o7y9vb7ykec27qmn?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/to-protocol-relative-url-js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/to-protocol-relative-url.js.svg?label=cov)](https://coveralls.io/r/shinnn/to-protocol-relative-url.js?branch=master)
[![Dependency Status](https://img.shields.io/david/shinnn/to-protocol-relative-url.js.svg?label=deps)](https://david-dm.org/shinnn/to-protocol-relative-url.js)
[![devDependency Status](https://img.shields.io/david/shinnn/to-protocol-relative-url.js.svg?label=devDeps)](https://david-dm.org/shinnn/to-protocol-relative-url.js#info=devDependencies)

Change a URL into [protocol-relative URL](http://www.paulirish.com/2010/the-protocol-relative-url/)

## Installation

### Package managers

#### [npm](https://www.npmjs.com/)

```sh
npm install --save to-protocol-relative-url
```

#### [Bower](http://bower.io/)

```sh
bower install --save to-protocol-relative-url
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/to-protocol-relative-url.js/master/to-protocol-relative-url.js)

## API

### toProtocolRelativeUrl(*url*)

*url*: `String`  
Return: `String`

```javascript
toProtocolRelativeURL('http://example.org');
//=> //example.org

toProtocolRelativeURL('https://github.com/');
//=> //github.com/

toProtocolRelativeURL('git@github.com:npm/npm.git');
//=> git@github.com:npm/npm.git (doesn't change)

toProtocolRelativeURL('Here is http://nodejs.org');
//=> Here is http://nodejs.org (doesn't change)
```

## CLI

You can use this module as a CLI tool by installing it [globally](https://docs.npmjs.com/files/folders#global-installation).

### Usage

```sh
Usage1: to-protocol-relative-url <string>
Usage2: echo <string> | to-protocol-relative-url

Options:
--help,    -h  Print usage information
--version, -v  Print version
```

## License

Copyright (c) 2014 - 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
