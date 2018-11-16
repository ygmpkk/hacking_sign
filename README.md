# sign

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Describe sign here.

## Usage

```
const data = new FormData();
data.append('OSSAccessKeyId', 'YOUR accessKeyID');
data.append('key', 'demo/z54AY7Jzpp.gif');
data.append('policy', 'eyJleHBpcmF0aW9uIjoiMjAxOC0xMS0xNlQwNzoxMTozMy41OTNaIiwiY29uZGl0aW9ucyI6W1siZXEiLCIka2V5IiwiZGVtby96NTRBWTdKenBwLmdpZiJdXX0=');
data.append('signature', 'f+LTfHZVpgZ0G/whuoBkTOYOBbM=');
data.append('success_action_status', '201');
data.append('file', FILE);

...PUT YOUR LOGICAL CODE HERE
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
