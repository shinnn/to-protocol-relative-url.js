# to-protocol-relative-url.js

[![NPM version](https://badge.fury.io/js/to-protocol-relative-url.svg)](https://www.npmjs.org/package/to-protocol-relative-url)
[![Bower version](https://badge.fury.io/bo/to-protocol-relative-url.svg)](hhttps://github.com/shinnn/to-protocol-relative-url.js/releases)
[![Build Status](https://travis-ci.org/shinnn/to-protocol-relative-url.js.svg?branch=master)](https://travis-ci.org/shinnn/to-protocol-relative-url.js)
[![Build status](https://ci.appveyor.com/api/projects/status/o7y9vb7ykec27qmn)](https://ci.appveyor.com/project/ShinnosukeWatanabe/to-protocol-relative-url-js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/to-protocol-relative-url.js.svg)](https://coveralls.io/r/shinnn/to-protocol-relative-url.js?branch=master)

Change a URL into [protocol-relative URL](http://www.paulirish.com/2010/the-protocol-relative-url/)

## Installation

### Package managers

#### [npm](https://www.npmjs.org/)

```
npm install --save to-protocol-relative-url
```

#### [Bower](http://bower.io/)

```
bower install --save to-protocol-relative-url
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/to-protocol-relative-url.js/master/to-protocol-relative-url.js)

## API

### toProtocolRelativeUrl(url) 

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

## License

Copyright (c) 2014 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
