# node-configs

[![build status][travis-image]][travis-url]
[![node version][node-image]][node-url]
[travis-image]: https://travis-ci.org/liushoukai/node-configs.svg?branch=master
[travis-url]: https://travis-ci.org/liushoukai/node-configs
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.12-brightgreen.svg?style=flat
[node-url]: http://nodejs.org/download/

**Loads a config based on environment variables config and node_env.**

## Config

**Directory Structure**
```
foo
+-- conf
|   +-- dev.json
|   `-- pro.json
|   `-- default.json
`-- package.json
```
**default.json**
```
{
  "person" : {
    "name" : "Bruce",
    "age"  : 122,
  }
}
```
## Usage

```
// Read from default json
$node index.js
var config = require('config');
var name = config.get('person.name');
```

```
// Read from dev json
node index.js --NODE_ENV=dev
var config = require('config');
var name = config.get('person.name');
```

```
// Read from pro json
node index.js --NODE_ENV=pro
var config = require('config');
var name = config.get('person.name');
```
