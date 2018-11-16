# sign

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Yet another Signature for S3 and OSS

## Installation

```
yarn add @happyhacking/sign
```

## Usage

```
import HackingSign from '@happyhacking/sign'

const options = {
  accessKeyId: '6MKOqxGiGU4AUk44',
  accessKeySecret: 'ufu7nS8kS59awNihtjSonMETLI0KLy',
  directory: 'demo/',
}

const oss = new HackingSign(options)

const key = 'z54AY7Jzpp.gif'
const signed = oss.sign('z54AY7Jzpp.gif')

const data = new FormData();
data.append('OSSAccessKeyId', signed.accessKeyId);
data.append('key', signed.key);
data.append('policy', signed.policy);
data.append('signature', signed.signature);
data.append('success_action_status', '201');
data.append('file', FILE);

...PUT YOUR HTTP REQUEST LOGICAL CODE HERE
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
